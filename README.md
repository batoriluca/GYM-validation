# validation-gym

Pagină standalone de preregistrare pentru GrowYourMusic. Colectează email, rol
și oraș (opțional) de la vizitatori și trimite datele către un Google Sheet,
printr-un webhook Google Apps Script, fără backend propriu.

Este un proiect Next.js 14 (App Router) separat de `web_frontend/`, dar
construit cu aceleași convenții (TypeScript, CSS Modules, Poppins, glass card
cu gradient purple, fără umbre, fără iconițe stoc, etichete numerotate 01-07
în loc de iconițe la secțiunea de feature-uri).

## Comenzi

Rulate din `validation-gym/`:

```bash
yarn install
yarn dev     # http://localhost:3000
yarn build
yarn start
yarn lint
```

## Structură

- `src/app/page.tsx` - pagina de preregistrare completă (header, hero, grid de
  feature-uri, secțiunea "pentru cine este", CTA final, footer)
- `src/components/PreregisterForm.tsx` - formularul de preregistrare (email,
  rol, oraș), cu validare, stare de loading, succes și eroare cu retry. După
  trimiterea cu succes, trece la pasul doi (`ValidationQuiz`) în loc de a
  afișa direct mesajul final de confirmare
- `src/components/ValidationQuiz.tsx` - chestionarul opțional de validare a
  ideii, afișat ca flux pas-cu-pas (o întrebare pe ecran, cu bară de progres),
  cu buton "Omite" vizibil în orice moment. La finalul
  chestionarului trimite un POST separat către același webhook, cu
  `type: "validare"`; la skip nu se trimite niciun request
- `src/components/PlatformMockups.tsx` - ilustrări stilizate (CSS, fără
  imagini) pentru hartă studiouri, management/calendar, bibliotecă muzicală,
  clasamente și editor de versuri, deoarece nu existau capturi reale
  disponibile pentru aceste ecrane în momentul implementării
- `public/screenshots/feed.png`, `shop.png`, `chat.png` - capturi reale ale
  platformei (preluate din `../platform-screenshots/`), folosite în hero și în
  grid-ul de feature-uri pentru marketplace și mesagerie
- `google-apps-script/Code.gs` - codul care trebuie lipit în Apps Script
- `src/i18n/translations.ts` - dicționarul EN/RO cu tot textul vizibil din
  pagină, formular și chestionar. Valorile canonice ale opțiunilor din
  formular și chestionar (rol, frecvență, funcționalități, interval de preț
  etc.) rămân în română indiferent de limba selectată, ca să nu se strice
  compatibilitatea cu `Code.gs` și cu rândurile deja existente în Google
  Sheet — doar eticheta afișată se traduce
- `src/i18n/LanguageContext.tsx` - context React (`LanguageProvider` /
  `useLanguage`) care ține limba curentă, persistată în `localStorage`
  (`gym_lang`). Limba implicită e engleza; alegerea utilizatorului se
  păstrează la refresh
- `src/components/LanguageSwitcher.tsx` - selectorul EN/RO din navbar

### Înlocuirea mockup-urilor cu capturi reale

Secțiunile 03-07 din grid-ul de feature-uri (hartă studiouri, management,
bibliotecă, clasamente, editor de versuri) folosesc momentan ilustrări
stilizate din `PlatformMockups.tsx`, nu capturi reale, pentru că extensia de
browser folosită pentru screenshot-uri nu era disponibilă. Pentru a le
înlocui:

1. Fă capturi de ecran ale paginilor `/studios`, `/management`, `/track`,
   `/leaderboard` și ale editorului de versuri din `web_frontend`
2. Adaugă-le în `public/screenshots/`
3. În `src/app/page.tsx`, înlocuiește componenta mockup corespunzătoare
   (ex: `<StudioMapMockup />`) cu un `<Image src="/screenshots/..." fill />`,
   la fel cum sunt folosite `shop.png` și `chat.png`

## Variabile de mediu

Copiază `.env.example` în `.env.local` și completează URL-ul webhook-ului
obținut mai jos:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_PREREGISTER_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Variabila trebuie să înceapă cu `NEXT_PUBLIC_` pentru ca Next.js să o expună
în bundle-ul de browser, deoarece formularul trimite requestul direct din
client, fără server intermediar.

## Configurarea Google Sheet-ului și a webhook-ului

1. Deschide [sheets.google.com](https://sheets.google.com) și creează un
   Google Sheet nou (ex: "GrowYourMusic - Preregistrări")
2. Din meniul foii, deschide **Extensions → Apps Script**
3. Șterge codul demo din editor și lipește tot conținutul fișierului
   `google-apps-script/Code.gs` din acest folder
4. Salvează proiectul (icoana de disichetă sau Ctrl/Cmd+S)
5. Apasă **Deploy → New deployment**
6. La tipul de deployment alege **Web app**
7. Completează:
   - Description: `preregister webhook` (opțional)
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Apasă **Deploy**. Google va cere permisiuni de acces la Sheet, acceptă-le
   (contul tău, nu al utilizatorilor care completează formularul)
9. Copiază **URL-ul Web App** afișat (se termină în `/exec`)
10. Lipește-l în `.env.local`, ca valoare pentru
    `NEXT_PUBLIC_PREREGISTER_WEBHOOK_URL`
11. Repornește `yarn dev` ca Next.js să preia noua variabilă de mediu

Foaia de calcul va primi automat, la prima trimitere, un rând de titluri:
`Timestamp | Email | Rol | Oraș | Sursă`.

Chestionarul de validare (pasul doi, opțional, din `PreregisterForm`) scrie
într-un tab separat, numit "Validare", creat automat la prima trimitere de
acest tip, cu coloanele:
`Timestamp | Email | Proces actual | Cea mai mare frustrare | A plătit | Suma plătită | Frecvență | Feature-uri preferate | Ar plăti abonament | Interval preț | Bariera de utilizare`.
Câmpul Email face legătura cu rândul de preregistrare corespunzător.

Dacă modifici ulterior codul din Apps Script (inclusiv acum, după adăugarea
suportului pentru tab-ul "Validare"), trebuie să faci un nou deployment
(**Deploy → Manage deployments → editează → New version**) pentru ca
modificările să ajungă live la același URL. Un simplu Ctrl/Cmd+S în editor nu
publică modificările.

### Notă despre CORS

Google Apps Script Web Apps nu răspund corect la request-urile de tip
preflight (`OPTIONS`). Formularul evită asta trimițând
`Content-Type: text/plain` în loc de `application/json`, astfel încât
browserul trimite requestul ca "simple request", fără preflight. Codul din
`Code.gs` face `JSON.parse` pe conținutul brut al requestului, indiferent de
Content-Type declarat.

Dacă în deployment-ul tău specific browserul tot blochează citirea
răspunsului din motive de CORS, cea mai simplă soluție este să adaugi
`mode: 'no-cors'` la fetch-ul din `PreregisterForm.tsx`. În acest caz nu se
mai poate citi răspunsul real de la server, iar formularul va trebui să
considere trimiterea reușită imediat ce requestul pleacă, fără eroare de
rețea.
