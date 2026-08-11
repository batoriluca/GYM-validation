export type Language = 'en' | 'ro'

export const LANGUAGES: Language[] = ['en', 'ro']

// Canonical option values are kept stable (in Romanian) across both languages
// so the Google Sheet backend (Code.gs) and existing rows stay consistent no
// matter which language a visitor filled the form in. Only the visible label
// changes with the selected language — see the `*Labels` maps below.

export const ROLE_VALUES = [
  'Artist',
  'Producător',
  'Beatmaker',
  'Inginer audio',
  'Creator vizual',
  'Studio',
  'Manager artiști',
  'Altul',
] as const

export const FREQUENCY_VALUES = ['Săptămânal', 'Lunar', 'Ocazional'] as const

export const FEATURE_VALUES = [
  'Marketplace pentru colaborări',
  'Hartă studiouri cu booking',
  'Management și calendar cu manageri',
  'Charts și vizibilitate în comunitate',
  'Unealtă de scriere versuri cu AI',
] as const

export const PRICE_VALUES = [
  'Sub 5 euro',
  '5 până la 15 euro',
  '15 până la 30 euro',
  'Peste 30 euro',
] as const

export const YES_NO_VALUES = ['Da', 'Nu'] as const
export const YES_NO_MAYBE_VALUES = ['Da', 'Nu', 'Depinde'] as const

export const TRANSLATIONS = {
    en: {
      nav: {
        home: 'Home',
        features: 'Features',
        audience: 'Who it’s for',
        register: 'Sign up',
        contact: 'Contact',
        followUs: 'Follow us',
      },
      hero: {
        badge: 'EARLY ACCESS',
        titlePre: 'One ecosystem for',
        titleAccent: 'your music career',
        subtitle:
          'GrowYourMusic brings artists, producers, beatmakers, audio engineers, visual creators, studios, and managers together on a single platform for collaboration and growth.',
        screenshotAlt: 'GrowYourMusic’s social feed',
        screenshotCaption: 'GrowYourMusic’s social feed',
        scrollHint: 'scroll for more',
      },
      founder: {
        badge: '60 DAYS',
        title: 'Founding member benefit',
        textPre: 'The first people who sign up get a',
        textAccent: 'visibility boost',
        textPost:
          'in listings (marketplace, studio map, feed) during the platform’s first 60 days.',
      },
      features: {
        label: 'WHY GROWYOURMUSIC',
        title: 'Everything you need to grow',
        subtitle: 'Every part of your music career, in one place.',
        items: [
          {
            title: 'A marketplace for the whole industry',
            text: 'Sell and buy music products and services: beats, mixing, mastering, visuals, and more. Every product has its own price and detail page, right in the platform.',
          },
          {
            title: 'Messaging and direct collaboration',
            text: 'Find collaborators, work out the details, and send offers without leaving the platform. Conversations stay organized in an easy-to-follow contact list.',
          },
          {
            title: 'An interactive studio map',
            text: 'Discover recording studios in your city on an interactive map. See the hourly rate and book a session directly, no calls or extra messages needed.',
          },
          {
            title: 'Management with a calendar and managers',
            text: 'Organize your sessions, releases, and events in a dedicated calendar. Your manager can add and edit events directly from your account.',
          },
          {
            title: 'A library for singles, albums, and EPs',
            text: 'Organize your tracks by project: singles, albums, or EPs. Track each song’s progress and keep everything structured in one place.',
          },
          {
            title: 'Charts for artists and producers',
            text: 'Climb the charts through collaborations, sales, and activity on the platform. Separate charts for artists and producers show you exactly where you stand.',
          },
          {
            title: 'Posting content to the feed',
            text: 'Publish images, videos, or text straight to your feed. Pick the right format for every update and reach your community in seconds.',
          },
          {
            title: 'AI-assisted lyric writing',
            text: 'Write lyrics right in the built-in editor and get suggestions for rhymes and continuations. Your ideas stay saved next to the track you’re working on.',
          },
          {
            title: 'Wallet and transactions',
            text: 'Manage your balance, deposits, and withdrawals from a single digital wallet. Payments for collaborations and products go straight through the platform.',
          },
          {
            title: 'Collaboration contracts',
            text: 'Create collaboration contracts with clear terms and status visible to both sides. Accept, decline, or track the progress of every collaboration.',
          },
        ],
      },
      audience: {
        label: 'WHO IT’S FOR',
        title: 'Who GrowYourMusic is for',
        subtitle: 'A platform built for everyone who’s part of the music-making process.',
        tags: ['Artists', 'Producers', 'Beatmakers', 'Audio engineers', 'Visual creators', 'Studios', 'Artist managers'],
      },
      cta: {
        title: 'Be the first to get access',
        subtitle: 'Sign up now and get notified as soon as the platform launches.',
        button: 'I want early access',
      },
      footer: {
        copyright: '© 2026 GrowYourMusic',
      },
      form: {
        emailLabel: 'Email',
        emailPlaceholder: 'name@example.com',
        roleLabel: 'Role',
        rolePlaceholder: 'Choose your role',
        cityLabel: 'City (optional)',
        cityPlaceholder: 'New York',
        submitButton: 'I want early access',
        submitButtonLoading: 'Sending...',
        errorEmailRequired: 'Email address is required.',
        errorEmailInvalid: 'Enter a valid email address.',
        errorRoleRequired: 'Select your role.',
        errorSubmitFailed: 'Submission failed. Check your connection and try again.',
        retryButton: 'Try again',
        successBadge: 'Confirmed',
        successTitle: 'You’re on the list',
        successText1: 'Thank you. We’ll email you as soon as GrowYourMusic is available for your account.',
        successText2:
          'As a founding member benefit, the first people to sign up get a visibility boost in listings (marketplace, studio map, feed) during the platform’s first 60 days.',
        roleLabels: {
          Artist: 'Artist',
          'Producător': 'Producer',
          Beatmaker: 'Beatmaker',
          'Inginer audio': 'Audio engineer',
          'Creator vizual': 'Visual creator',
          Studio: 'Studio',
          'Manager artiști': 'Artist manager',
          Altul: 'Other',
        } as Record<(typeof ROLE_VALUES)[number], string>,
      },
      quiz: {
        stepLabel: (n: number, total: number) => `Question ${n} of ${total}`,
        skipButton: 'Skip',
        backButton: 'Back',
        continueButton: 'Continue',
        submitButton: 'Submit',
        sendingButton: 'Sending...',
        optionalPlaceholder: 'Optional',
        questions: {
          current_process: 'How do you currently find or collaborate with producers, studios, or artists for your projects?',
          biggest_pain: 'What part of this process feels most frustrating or time-consuming?',
          has_paid: 'Have you ever paid for a service that helps with this (studio, promotion, management, online mixing)?',
          paid_amount: 'How much did you pay last time, and for what exactly?',
          frequency: 'How often do you need this kind of collaboration or service?',
          top_features: 'Which feature seems most useful to you right now?',
          would_pay: 'Would you be willing to pay a monthly subscription for a platform that solves this?',
          price_range: 'What monthly amount would feel fair to you?',
          concerns: 'What would stop you from using a platform like this?',
        },
        paidAmountPlaceholder: 'e.g. €50 for mixing',
        yesNoLabels: { Da: 'Yes', Nu: 'No' } as Record<(typeof YES_NO_VALUES)[number], string>,
        yesNoMaybeLabels: { Da: 'Yes', Nu: 'No', Depinde: 'Depends' } as Record<
          (typeof YES_NO_MAYBE_VALUES)[number],
          string
        >,
        frequencyLabels: {
          'Săptămânal': 'Weekly',
          Lunar: 'Monthly',
          Ocazional: 'Occasional',
        } as Record<(typeof FREQUENCY_VALUES)[number], string>,
        featureLabels: {
          'Marketplace pentru colaborări': 'Marketplace for collaborations',
          'Hartă studiouri cu booking': 'Studio map with booking',
          'Management și calendar cu manageri': 'Management and calendar with managers',
          'Charts și vizibilitate în comunitate': 'Charts and visibility in the community',
          'Unealtă de scriere versuri cu AI': 'AI-assisted lyric writing tool',
        } as Record<(typeof FEATURE_VALUES)[number], string>,
        priceLabels: {
          'Sub 5 euro': 'Under €5',
          '5 până la 15 euro': '€5 to €15',
          '15 până la 30 euro': '€15 to €30',
          'Peste 30 euro': 'Over €30',
        } as Record<(typeof PRICE_VALUES)[number], string>,
      },
      mockups: {
        studio: {
          name: 'Studio Noiz',
          location: 'Sector 3, Bucharest',
          price: '€25 / hour',
          button: 'Book',
        },
        management: {
          days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          event: 'Recording session with manager',
        },
        library: {
          tracks: ['Single - Long Nights', 'Album - My Own Path', 'EP - First Lines'],
        },
        post: {
          title: 'Choose post type',
          options: ['Image', 'Video', 'Text'],
          button: 'Publish',
        },
        wallet: {
          label: 'Available balance',
          amount: '€250',
          deposit: 'Deposit',
          withdraw: 'Withdraw',
          history: [
            { label: 'Mix & Master collaboration', amount: '+€60' },
            { label: 'Studio Noiz booking', amount: '-€25' },
          ],
        },
        contract: {
          title: 'Collaboration contract',
          signed: 'Signed',
          pending: 'Pending',
          fee: 'Fee',
          rows: [
            { names: 'GYM_user1 x GYM_user2', fee: '€80', status: 'signed' as const },
            { names: 'GYM_user1 x GYM_user3', fee: '€50', status: 'pending' as const },
          ],
        },
        lyrics: {
          lines: [
            'Verse 1',
            'I walk this city, chasing the light',
            "Every step I take, I know it's right",
            '',
            'Chorus',
            'We rise up every night,',
          ],
          aiTag: 'AI suggestion',
          aiSuggestion: 'The next rhyme could continue with "burning bright".',
        },
        marketplace: {
          items: [
            { name: 'Melodic Trap Beat', price: '€30' },
            { name: 'Mix & Master', price: '€60' },
            { name: 'Cover Art Design', price: '€15' },
          ],
        },
        messaging: {
          contact: 'GYM_user2',
          incoming: 'Hey! I listened to the track, sounds great 🔥',
          outgoing: 'Thanks! Want to collaborate on a mix?',
        },
      },
    },
    ro: {
      nav: {
        home: 'Acasă',
        features: 'Funcționalități',
        audience: 'Pentru cine',
        register: 'Înscrie-te',
        contact: 'Contact',
        followUs: 'Urmărește-ne',
      },
      hero: {
        badge: 'ACCES ANTICIPAT',
        titlePre: 'Un singur ecosistem pentru',
        titleAccent: 'cariera ta muzicală',
        subtitle:
          'GrowYourMusic aduce artiști, producători, beatmakeri, ingineri audio, creatori vizuali, studiouri și manageri într-o singură platformă de colaborare și creștere.',
        screenshotAlt: 'Feed-ul social GrowYourMusic',
        screenshotCaption: 'Feed-ul social GrowYourMusic',
        scrollHint: 'scroll pentru mai mult',
      },
      founder: {
        badge: '60 ZILE',
        title: 'Beneficiu de fondator',
        textPre: 'Primii înscriși primesc',
        textAccent: 'boost de vizibilitate',
        textPost: 'în listări (marketplace, hartă studiouri, feed) în primele 60 de zile de la lansarea platformei.',
      },
      features: {
        label: 'DE CE GROWYOURMUSIC',
        title: 'Tot ce îți trebuie ca să crești',
        subtitle: 'Fiecare parte a carierei tale muzicale, într-un singur loc.',
        items: [
          {
            title: 'Marketplace pentru toată industria',
            text: 'Vinde și cumpără produse și servicii muzicale: beat-uri, mixaj, mastering, vizualuri și multe altele. Fiecare produs are propriul preț și pagină de detalii, direct în platformă.',
          },
          {
            title: 'Mesagerie și colaborare directă',
            text: 'Găsește colaboratori, discută detalii și trimite oferte fără să ieși din platformă. Conversațiile rămân organizate într-o listă de contacte ușor de urmărit.',
          },
          {
            title: 'Hartă interactivă de studiouri',
            text: 'Descoperă studiouri de înregistrare din orașul tău pe o hartă interactivă. Vezi prețul pe oră și rezervă direct o sesiune, fără telefoane sau mesaje în plus.',
          },
          {
            title: 'Management cu calendar și manageri',
            text: 'Organizează-ți sesiunile, lansările și evenimentele într-un calendar dedicat. Managerul tău poate adăuga și edita evenimente direct din contul tău.',
          },
          {
            title: 'Bibliotecă pentru single-uri, albume și EP-uri',
            text: 'Organizează-ți piesele pe proiecte: single-uri, albume sau EP-uri. Urmărește progresul fiecărei piese și păstrează totul structurat într-un singur loc.',
          },
          {
            title: 'Clasamente pentru artiști și producători',
            text: 'Urcă în topuri prin colaborări, vânzări și activitate în platformă. Clasamentele separate pentru artiști și producători îți arată exact unde te afli.',
          },
          {
            title: 'Postare de conținut pe feed',
            text: 'Publică imagini, videoclipuri sau text direct pe feed-ul tău. Alege formatul potrivit pentru fiecare noutate și ajungi la comunitatea ta în câteva secunde.',
          },
          {
            title: 'Scriere de versuri cu asistență AI',
            text: 'Scrie versuri direct în editorul integrat și primește sugestii de rime și continuări. Ideile rămân salvate lângă fiecare piesă la care lucrezi.',
          },
          {
            title: 'Portofel și tranzacții',
            text: 'Administrează-ți soldul, depunerile și retragerile dintr-un singur portofel digital. Plățile pentru colaborări și produse trec direct prin platformă.',
          },
          {
            title: 'Contracte de colaborare',
            text: 'Creează contracte de colaborare cu termeni clari și status vizibil pentru ambele părți. Acceptă, respinge sau urmărește evoluția fiecărei colaborări.',
          },
        ],
      },
      audience: {
        label: 'PENTRU CINE ESTE',
        title: 'Pentru cine este GrowYourMusic',
        subtitle: 'O platformă construită pentru toți cei care fac parte din procesul muzical.',
        tags: ['Artiști', 'Producători', 'Beatmakeri', 'Ingineri audio', 'Creatori vizuali', 'Studiouri', 'Manageri artiști'],
      },
      cta: {
        title: 'Fii primul care are acces',
        subtitle: 'Înscrie-te acum și primești o notificare imediat ce platforma se lansează.',
        button: 'Vreau acces anticipat',
      },
      footer: {
        copyright: '© 2026 GrowYourMusic',
      },
      form: {
        emailLabel: 'Email',
        emailPlaceholder: 'nume@exemplu.ro',
        roleLabel: 'Rol',
        rolePlaceholder: 'Alege rolul tău',
        cityLabel: 'Oraș (opțional)',
        cityPlaceholder: 'București',
        submitButton: 'Vreau acces anticipat',
        submitButtonLoading: 'Se trimite...',
        errorEmailRequired: 'Adresa de email este obligatorie.',
        errorEmailInvalid: 'Introdu o adresă de email validă.',
        errorRoleRequired: 'Selectează rolul tău.',
        errorSubmitFailed: 'Trimiterea a eșuat. Verifică conexiunea și încearcă din nou.',
        retryButton: 'Încearcă din nou',
        successBadge: 'Confirmat',
        successTitle: 'Ești pe listă',
        successText1: 'Îți mulțumim. Te vom anunța pe email de îndată ce GrowYourMusic este disponibil pentru contul tău.',
        successText2:
          'Ca beneficiu de fondator, primii înscriși primesc boost de vizibilitate în listări (marketplace, hartă studiouri, feed) în primele 60 de zile de la lansarea platformei.',
        roleLabels: {
          Artist: 'Artist',
          'Producător': 'Producător',
          Beatmaker: 'Beatmaker',
          'Inginer audio': 'Inginer audio',
          'Creator vizual': 'Creator vizual',
          Studio: 'Studio',
          'Manager artiști': 'Manager artiști',
          Altul: 'Altul',
        } as Record<(typeof ROLE_VALUES)[number], string>,
      },
      quiz: {
        stepLabel: (n: number, total: number) => `Întrebarea ${n} din ${total}`,
        skipButton: 'Omite',
        backButton: 'Înapoi',
        continueButton: 'Continuă',
        submitButton: 'Trimite',
        sendingButton: 'Se trimite...',
        optionalPlaceholder: 'Opțional',
        questions: {
          current_process: 'Cum găsești sau colaborezi în prezent cu producători, studiouri sau artiști pentru proiectele tale?',
          biggest_pain: 'Ce parte din acest proces ți se pare cea mai frustrantă sau consumă cel mai mult timp?',
          has_paid: 'Ai plătit vreodată pentru un serviciu care te ajută cu asta (studio, promovare, management, mixaj online)?',
          paid_amount: 'Cât ai plătit ultima dată și pentru ce anume?',
          frequency: 'Cât de des ai nevoie de acest tip de colaborare sau serviciu?',
          top_features: 'Care funcționalitate ți se pare cea mai utilă chiar acum?',
          would_pay: 'Ai fi dispus să plătești un abonament lunar pentru o platformă care rezolvă asta?',
          price_range: 'Ce sumă lunară ți s-ar părea corectă?',
          concerns: 'Ce te-ar face să NU folosești o astfel de platformă?',
        },
        paidAmountPlaceholder: 'ex: 50 euro pentru mixaj',
        yesNoLabels: { Da: 'Da', Nu: 'Nu' } as Record<(typeof YES_NO_VALUES)[number], string>,
        yesNoMaybeLabels: { Da: 'Da', Nu: 'Nu', Depinde: 'Depinde' } as Record<
          (typeof YES_NO_MAYBE_VALUES)[number],
          string
        >,
        frequencyLabels: {
          'Săptămânal': 'Săptămânal',
          Lunar: 'Lunar',
          Ocazional: 'Ocazional',
        } as Record<(typeof FREQUENCY_VALUES)[number], string>,
        featureLabels: {
          'Marketplace pentru colaborări': 'Marketplace pentru colaborări',
          'Hartă studiouri cu booking': 'Hartă studiouri cu booking',
          'Management și calendar cu manageri': 'Management și calendar cu manageri',
          'Charts și vizibilitate în comunitate': 'Charts și vizibilitate în comunitate',
          'Unealtă de scriere versuri cu AI': 'Unealtă de scriere versuri cu AI',
        } as Record<(typeof FEATURE_VALUES)[number], string>,
        priceLabels: {
          'Sub 5 euro': 'Sub 5 euro',
          '5 până la 15 euro': '5 până la 15 euro',
          '15 până la 30 euro': '15 până la 30 euro',
          'Peste 30 euro': 'Peste 30 euro',
        } as Record<(typeof PRICE_VALUES)[number], string>,
      },
      mockups: {
        studio: {
          name: 'Studio Noiz',
          location: 'Sector 3, București',
          price: '25 € / oră',
          button: 'Rezervă',
        },
        management: {
          days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
          event: 'Sesiune înregistrare cu manager',
        },
        library: {
          tracks: ['Single - Nopți lungi', 'Album - Drum Propriu', 'EP - Primele Rânduri'],
        },
        post: {
          title: 'Alege tipul postării',
          options: ['Imagine', 'Video', 'Text'],
          button: 'Publică',
        },
        wallet: {
          label: 'Sold disponibil',
          amount: '250 €',
          deposit: 'Depune',
          withdraw: 'Retrage',
          history: [
            { label: 'Colaborare Mix & Master', amount: '+60 €' },
            { label: 'Rezervare Studio Noiz', amount: '-25 €' },
          ],
        },
        contract: {
          title: 'Contract colaborare',
          signed: 'Semnat',
          pending: 'În așteptare',
          fee: 'Onorariu',
          rows: [
            { names: 'GYM_user1 x GYM_user2', fee: '80 €', status: 'signed' as const },
            { names: 'GYM_user1 x GYM_user3', fee: '50 €', status: 'pending' as const },
          ],
        },
        lyrics: {
          lines: [
            'Verse 1',
            'Merg pe stradă cu un vis în gând,',
            'Îmi construiesc viitorul, rând cu rând,',
            '',
            'Chorus',
            'Vreau să ajung sus, până la cer,',
          ],
          aiTag: 'Sugestie AI',
          aiSuggestion: 'Rima următoare ar putea continua cu „un vis sincer”.',
        },
        marketplace: {
          items: [
            { name: 'Beat Trap Melodic', price: '30 €' },
            { name: 'Mix & Master', price: '60 €' },
            { name: 'Design Cover Art', price: '15 €' },
          ],
        },
        messaging: {
          contact: 'GYM_user2',
          incoming: 'Salut! Am ascultat piesa, sună foarte bine 🔥',
          outgoing: 'Mersi! Vrei să colaborăm la un mix?',
        },
      },
    },
}

export type TranslationShape = typeof TRANSLATIONS.en
