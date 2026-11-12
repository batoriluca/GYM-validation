import type { Language } from './translations'

// Privacy policy for the preregistration site, in each language.
//
// The operator (data controller): an întreprindere individuală (II).
export const CONTROLLER = {
  name: 'BATORI DONCA ȘIMON CRISTIAN ALEXANDRU ÎNTREPRINDERE INDIVIDUALĂ',
  cui: '46261071',
  address: 'Strada Regele Ferdinand nr. 52, sat Amati, comuna Păulești, județul Satu Mare, România',
  email: 'contact@growyourmusic.app',
}

export const PRIVACY_UPDATED = '2026-11-12'

type Section = { title: string; paragraphs?: string[]; items?: string[] }

export type PrivacyContent = {
  title: string
  updatedLabel: string
  intro: string
  sections: Section[]
}

const c = CONTROLLER

export const PRIVACY: Record<Language, PrivacyContent> = {
  en: {
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    intro:
      'This policy explains what we collect when you sign up for early access to GrowYourMusic, why, and what you can do about it. It covers this preregistration site only. The platform itself will have its own policy at launch.',
    sections: [
      {
        title: 'Who we are',
        paragraphs: [
          `GrowYourMusic is operated by ${c.name} (CUI ${c.cui}), ${c.address} (“we”, “us”). We are the controller of the data described here. You can reach us at ${c.email}.`,
        ],
      },
      {
        title: 'What we collect',
        items: [
          'Your email address, the role you pick, and your city if you give it.',
          'Your consent to receive the launch email, and when you gave it.',
          'The visibility boost you are entitled to as an early member (number of days).',
          'Your answers to the optional questions shown after signup, linked to your email.',
          'Where you came from, if the link you used had a campaign tag (for example utm_source=instagram).',
          'Anonymous, aggregated visit statistics (pages viewed, button clicks), with no cookies and no way to identify you.',
        ],
      },
      {
        title: 'Why we use it',
        items: [
          'To email you when GrowYourMusic launches, and to apply your early-member visibility boost.',
          'To understand who the platform is for and what to build first, using your role, city and answers.',
          'To see which channels bring people to the site.',
        ],
        paragraphs: [
          'We rely on your consent, which you give by ticking the box on the form. We do not sell your data, and we do not send you marketing beyond the launch email unless you agree to it separately.',
        ],
      },
      {
        title: 'What you must give us',
        paragraphs: [
          'To sign up you need to give your email address, your role and your consent to the launch email. Without them we can’t put you on the list or email you at launch. Your city and the questions after signup are optional: skipping them changes nothing about your signup or your visibility boost.',
        ],
      },
      {
        title: 'Automated decisions',
        paragraphs: [
          'We don’t make decisions about you based solely on automated processing, and we don’t build profiles that have legal or similarly significant effects on you. Your visibility boost depends only on when you signed up.',
        ],
      },
      {
        title: 'Who processes it for us',
        paragraphs: [
          'Your signup is stored with Supabase, our database provider, on servers in the European Union (Ireland). The site is hosted by Vercel, which also provides the cookie-free visit statistics. When we send the launch email, we will use an email delivery provider. These providers act only on our instructions. Vercel is based in the United States; where data is transferred outside the European Economic Area, the transfer is covered by the European Commission’s standard contractual clauses.',
        ],
      },
      {
        title: 'How long we keep it',
        paragraphs: [
          'We keep your signup until you ask us to delete it, and at most 12 months after the platform launches. After that we delete it, or keep only anonymous totals.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          `You can ask us at any time to see, correct or delete your data, to restrict or object to how we use it, or to receive a copy of it. You can withdraw your consent whenever you want, by using the unsubscribe link in our email or by writing to ${c.email}. Withdrawing does not affect what we did before. If you think we have mishandled your data, you can complain to the data protection authority in your country; in Romania this is ANSPDCP (dataprotection.ro).`,
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'This site does not use cookies. It saves your chosen language in your browser’s local storage so the page opens in that language next time.',
        ],
      },
      {
        title: 'Age',
        paragraphs: [
          'Early access is meant for people aged 16 and over. If you are younger, please ask a parent or guardian before signing up.',
        ],
      },
      {
        title: 'Changes',
        paragraphs: [
          'If we change this policy, we will update the date at the top of this page. If a change affects how we use the data you already gave us, we will email you first.',
        ],
      },
    ],
  },

  ro: {
    title: 'Politica de confidențialitate',
    updatedLabel: 'Ultima actualizare',
    intro:
      'Această politică explică ce date colectăm când te înscrii pentru acces timpuriu la GrowYourMusic, de ce, și ce poți face în privința lor. Se aplică doar acestui site de preînregistrare. Platforma va avea propria politică la lansare.',
    sections: [
      {
        title: 'Cine suntem',
        paragraphs: [
          `GrowYourMusic este operat de ${c.name} (CUI ${c.cui}), ${c.address} („noi”). Suntem operatorul datelor descrise aici. Ne poți scrie la ${c.email}.`,
        ],
      },
      {
        title: 'Ce colectăm',
        items: [
          'Adresa ta de email, rolul ales și orașul, dacă îl completezi.',
          'Acordul tău de a primi emailul de lansare și momentul în care l-ai dat.',
          'Boost-ul de vizibilitate la care ai dreptul ca membru timpuriu (numărul de zile).',
          'Răspunsurile tale la întrebările opționale de după înscriere, asociate emailului tău.',
          'De unde ai venit, dacă linkul folosit avea o etichetă de campanie (de exemplu utm_source=instagram).',
          'Statistici de vizitare anonime și agregate (pagini văzute, clickuri pe butoane), fără cookie-uri și fără posibilitatea de a te identifica.',
        ],
      },
      {
        title: 'De ce le folosim',
        items: [
          'Ca să te anunțăm pe email când se lansează GrowYourMusic și să-ți aplicăm boost-ul de vizibilitate.',
          'Ca să înțelegem pentru cine este platforma și ce să construim mai întâi, pe baza rolului, orașului și răspunsurilor tale.',
          'Ca să vedem ce canale aduc oameni pe site.',
        ],
        paragraphs: [
          'Ne bazăm pe consimțământul tău, pe care îl dai bifând căsuța din formular. Nu vindem datele tale și nu îți trimitem alte emailuri de marketing în afară de cel de lansare, decât dacă ești de acord separat.',
        ],
      },
      {
        title: 'Ce trebuie să ne dai',
        paragraphs: [
          'Pentru înscriere ai nevoie de adresa de email, rolul tău și acordul pentru emailul de lansare. Fără ele nu te putem adăuga pe listă și nu te putem anunța la lansare. Orașul și întrebările de după înscriere sunt opționale: dacă le sari, nu se schimbă nimic la înscrierea ta sau la boost-ul de vizibilitate.',
        ],
      },
      {
        title: 'Decizii automate',
        paragraphs: [
          'Nu luăm decizii despre tine bazate exclusiv pe prelucrare automată și nu creăm profiluri care să aibă efecte juridice sau efecte similare semnificative asupra ta. Boost-ul de vizibilitate depinde doar de momentul în care te-ai înscris.',
        ],
      },
      {
        title: 'Cine le prelucrează pentru noi',
        paragraphs: [
          'Înscrierea ta este stocată la Supabase, furnizorul nostru de bază de date, pe servere din Uniunea Europeană (Irlanda). Site-ul este găzduit de Vercel, care furnizează și statisticile de vizitare fără cookie-uri. Pentru emailul de lansare vom folosi un furnizor de trimitere a emailurilor. Acești furnizori acționează doar conform instrucțiunilor noastre. Vercel are sediul în Statele Unite; atunci când datele sunt transferate în afara Spațiului Economic European, transferul este acoperit de clauzele contractuale standard ale Comisiei Europene.',
        ],
      },
      {
        title: 'Cât timp le păstrăm',
        paragraphs: [
          'Păstrăm înscrierea ta până ne ceri să o ștergem, dar cel mult 12 luni după lansarea platformei. După aceea o ștergem sau păstrăm doar totaluri anonime.',
        ],
      },
      {
        title: 'Drepturile tale',
        paragraphs: [
          `Ne poți cere oricând să vezi, să corectezi sau să ștergi datele tale, să restricționezi sau să te opui modului în care le folosim, ori să primești o copie a lor. Îți poți retrage consimțământul oricând, folosind linkul de dezabonare din emailul nostru sau scriindu-ne la ${c.email}. Retragerea nu afectează ce am făcut înainte. Dacă crezi că am gestionat greșit datele tale, poți depune o plângere la ANSPDCP (dataprotection.ro) sau la autoritatea de protecție a datelor din țara ta.`,
        ],
      },
      {
        title: 'Cookie-uri',
        paragraphs: [
          'Acest site nu folosește cookie-uri. Salvează limba aleasă în spațiul de stocare local al browserului, ca pagina să se deschidă în acea limbă data viitoare.',
        ],
      },
      {
        title: 'Vârstă',
        paragraphs: [
          'Accesul timpuriu este pentru persoane de cel puțin 16 ani. Dacă ești mai mic, te rugăm să întrebi un părinte sau tutore înainte să te înscrii.',
        ],
      },
      {
        title: 'Modificări',
        paragraphs: [
          'Dacă modificăm această politică, actualizăm data din partea de sus a paginii. Dacă o modificare afectează felul în care folosim datele pe care ni le-ai dat deja, te anunțăm mai întâi pe email.',
        ],
      },
    ],
  },

  it: {
    title: 'Informativa sulla privacy',
    updatedLabel: 'Ultimo aggiornamento',
    intro:
      'Questa informativa spiega quali dati raccogliamo quando ti iscrivi per l’accesso anticipato a GrowYourMusic, perché, e cosa puoi fare al riguardo. Riguarda solo questo sito di preregistrazione. La piattaforma avrà una propria informativa al lancio.',
    sections: [
      {
        title: 'Chi siamo',
        paragraphs: [
          `GrowYourMusic è gestito da ${c.name} (CUI ${c.cui}), ${c.address} (“noi”). Siamo il titolare del trattamento dei dati descritti qui. Puoi scriverci a ${c.email}.`,
        ],
      },
      {
        title: 'Cosa raccogliamo',
        items: [
          'Il tuo indirizzo email, il ruolo scelto e la città, se la indichi.',
          'Il tuo consenso a ricevere l’email di lancio e il momento in cui l’hai dato.',
          'Il boost di visibilità a cui hai diritto come membro anticipato (numero di giorni).',
          'Le tue risposte alle domande facoltative mostrate dopo l’iscrizione, collegate alla tua email.',
          'Da dove sei arrivato, se il link usato aveva un tag di campagna (per esempio utm_source=instagram).',
          'Statistiche di visita anonime e aggregate (pagine viste, clic sui pulsanti), senza cookie e senza possibilità di identificarti.',
        ],
      },
      {
        title: 'Perché li usiamo',
        items: [
          'Per avvisarti via email quando GrowYourMusic sarà lanciato e applicare il tuo boost di visibilità.',
          'Per capire a chi serve la piattaforma e cosa costruire prima, in base a ruolo, città e risposte.',
          'Per vedere quali canali portano persone sul sito.',
        ],
        paragraphs: [
          'La base giuridica è il tuo consenso, che dai spuntando la casella nel modulo. Non vendiamo i tuoi dati e non ti inviamo altre email di marketing oltre a quella di lancio, salvo tuo consenso separato.',
        ],
      },
      {
        title: 'Cosa devi fornirci',
        paragraphs: [
          'Per iscriverti servono il tuo indirizzo email, il tuo ruolo e il consenso all’email di lancio. Senza questi dati non possiamo inserirti nella lista né avvisarti al lancio. La città e le domande dopo l’iscrizione sono facoltative: se le salti non cambia nulla per la tua iscrizione o per il tuo boost di visibilità.',
        ],
      },
      {
        title: 'Decisioni automatizzate',
        paragraphs: [
          'Non prendiamo decisioni che ti riguardano basate unicamente su un trattamento automatizzato e non creiamo profili che producano effetti giuridici o effetti analoghi significativi su di te. Il tuo boost di visibilità dipende solo da quando ti sei iscritto.',
        ],
      },
      {
        title: 'Chi li tratta per noi',
        paragraphs: [
          'La tua iscrizione è conservata su Supabase, il nostro fornitore di database, su server nell’Unione europea (Irlanda). Il sito è ospitato da Vercel, che fornisce anche le statistiche di visita senza cookie. Per l’email di lancio useremo un fornitore di invio email. Questi fornitori agiscono solo secondo le nostre istruzioni. Vercel ha sede negli Stati Uniti; quando i dati vengono trasferiti fuori dallo Spazio economico europeo, il trasferimento è coperto dalle clausole contrattuali standard della Commissione europea.',
        ],
      },
      {
        title: 'Per quanto tempo li conserviamo',
        paragraphs: [
          'Conserviamo la tua iscrizione finché non ci chiedi di cancellarla, e comunque non oltre 12 mesi dal lancio della piattaforma. Dopo la cancelliamo, o conserviamo solo totali anonimi.',
        ],
      },
      {
        title: 'I tuoi diritti',
        paragraphs: [
          `Puoi chiederci in qualsiasi momento di vedere, correggere o cancellare i tuoi dati, di limitarne o opporti al loro uso, o di riceverne una copia. Puoi revocare il consenso quando vuoi, usando il link di disiscrizione nella nostra email o scrivendo a ${c.email}. La revoca non incide su quanto fatto prima. Se ritieni che abbiamo trattato male i tuoi dati, puoi presentare reclamo all’autorità per la protezione dei dati del tuo paese; in Italia è il Garante per la protezione dei dati personali (garanteprivacy.it).`,
        ],
      },
      {
        title: 'Cookie',
        paragraphs: [
          'Questo sito non usa cookie. Salva la lingua scelta nella memoria locale del browser, così la pagina si apre in quella lingua la volta successiva.',
        ],
      },
      {
        title: 'Età',
        paragraphs: [
          'L’accesso anticipato è pensato per persone dai 16 anni in su. Se sei più giovane, chiedi a un genitore o tutore prima di iscriverti.',
        ],
      },
      {
        title: 'Modifiche',
        paragraphs: [
          'Se modifichiamo questa informativa, aggiorniamo la data in cima alla pagina. Se una modifica riguarda l’uso dei dati che ci hai già dato, ti avviseremo prima via email.',
        ],
      },
    ],
  },
}
