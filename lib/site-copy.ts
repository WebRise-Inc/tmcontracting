export const locales = ["en", "fr"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"
export const localeCookieName = "tm-locale"
export const localeStorageKey = "tm-contracting-locale"

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr"
}

type Phrase = {
  label: string
  heading: string
  body: string
}

type Service = {
  title: string
  slug: string
  image: string
  description: string
}

type Slide = {
  src: string
  alt: string
}

type Stat = {
  value: string
  label: string
}

type AboutContentSection = {
  heading: string
  items: string[]
}

const contactSectorOptionsEn = [
  "Gatineau",
  "Aylmer",
  "Hull",
  "Buckingham",
  "Masson-Angers",
  "Chelsea",
  "Cantley",
  "Val-des-Monts",
  "Wakefield",
  "Ottawa",
  "Kanata",
  "Nepean",
  "Orleans",
  "Barrhaven",
  "Montreal",
  "Laval",
  "Longueuil",
  "Terrebonne",
  "Repentigny",
  "Other",
] as const

const contactSectorOptionsFr = [
  "Gatineau",
  "Aylmer",
  "Hull",
  "Buckingham",
  "Masson-Angers",
  "Chelsea",
  "Cantley",
  "Val-des-Monts",
  "Wakefield",
  "Ottawa",
  "Kanata",
  "Nepean",
  "Orleans",
  "Barrhaven",
  "Montreal",
  "Laval",
  "Longueuil",
  "Terrebonne",
  "Repentigny",
  "Autre",
] as const

export type SiteCopy = {
  metadata: {
    title: string
    description: string
  }
  navbar: {
    logoAlt: string
    home: string
    services: string
    onlineEstimate: string
    career: string
    faq: string
    contactUs: string
    toggleMenu: string
  }
  hero: {
    phrases: Phrase[]
    provinces: string[]
    bookCall: string
    goToPhrase: string
  }
  services: {
    eyebrow: string
    title: string
    items: Service[]
    learnMore: string
  }
  about: {
    eyebrow: string
    titleLineOne?: string
    titleLineTwo?: string
    slides: Slide[]
    goToSlide: string
    note?: string
    paragraphs: string[]
    sections?: AboutContentSection[]
    warranty: {
      title: string
      body: string
    }
    stats: Stat[]
    cta: string
  }
  reviews: {
    eyebrow: string
    title: string
  }
  contact: {
    eyebrow: string
    title: string
    tabs: {
      quote: string
      contact: string
      career: string
    }
    success: {
      title: string
      body: string
      reset: string
    }
    forms: {
      requiredNotice: string
      submitIdle: string
      submitLoading: string
      selectTimePlaceholder: string
      timeOptions: string[]
      fileInput: {
        chooseSingle: string
        chooseMultiple: string
        selectedSingle: string
        selectedMultiple: string
      }
      career: {
        fullName: string
        city: string
        phone: string
        email: string
        workAuthorization: string
        workAuthorizationPlaceholder: string
        workAuthorizationOptions: string[]
        driversLicense: string
        driversLicenseOptions: string[]
        languages: string
        languagesPlaceholder: string
        languageOptions: string[]
        cv: string
        coverLetter: string
        photo: string
      }
      quote: {
        fullName: string
        phone: string
        email: string
        address: string
        description: string
        descriptionPlaceholder: string
        photos: string
      }
      contact: {
        name: string
        phone: string
        email: string
        sector: string
        sectorPlaceholder: string
        sectorOptions: string[]
        preferredWindow: string
        preferredTimeToggle: string
        preferredTimeHint: string
        preferredTime: string
      }
    }
    mapTitle: string
    officeTitle: string
    regionPrimary: string
    regionSecondary: string
    serving: string
  }
  emails: {
    contact: {
      subjectPrefix: string
      heading: string
      name: string
      phone: string
      email: string
      sector: string
      preferredWindow: string
      preferredTime: string
    }
    quote: {
      subjectPrefix: string
      heading: string
      fullName: string
      phone: string
      email: string
      address: string
      description: string
      photos: string
      photoLabel: string
    }
    career: {
      subjectPrefix: string
      heading: string
      fullName: string
      city: string
      phone: string
      email: string
      workAuthorization: string
      driversLicense: string
      languages: string
      cv: string
      downloadCv: string
      coverLetter: string
      downloadCoverLetter: string
      photo: string
      viewPhoto: string
    }
  }
}

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    metadata: {
      title: "TM Contracting",
      description:
        "Full-service general contracting from excavation to keys. 3-Year Risk-Free Warranty. Serving Quebec and Ontario. TM Contracting.",
    },
    navbar: {
      logoAlt: "TM Contracting",
      home: "Home",
      services: "Services",
      onlineEstimate: "Let's Meet",
      career: "Career",
      faq: "FAQ",
      contactUs: "Contact us",
      toggleMenu: "Toggle menu",
    },
    hero: {
      phrases: [
        {
          label: "BECAUSE YOU DESERVE...",
          heading: "3 YEARS RISK-FREE WARANTY",
          body: "3-Year Risk-Free Warranty means exactly that: zero risk for you for 3 full years. It covers 100% of our work, and if anything we did isn't right, we fix it—no hassle, no back-and-forth, no excuses. It's a simple promise backed by real accountability, so you can move forward with total confidence and real peace of mind.",
        },
        {
          label: "BECAUSE YOU DESERVE...",
          heading: "One Team. One Contact. Zero Headache.",
          body: "A to Z—from excavation to keys—with one accountable team managing every step. We take care of planning, trades, materials, scheduling, and site coordination, so you get one point of contact and zero headache. No chasing contractors, no mixed messages, no chaos. Just a well-managed project from start to finish.",
        },
        {
          label: "BECAUSE YOU DESERVE...",
          heading: "Free Advice. Free Information. Free Estimates.",
          body: "Ask any question, share any problem, and get the information you need free of charge—online or in person. Whether you need advice, ideas, answers, or even an estimate, we're here to help with no pressure and no obligation. Even if you never move forward with us, the time, guidance, and estimate are still free. It's our way of giving back to the community we value.",
        },
      ],
      provinces: ["Quebec", "Ontario"],
      bookCall: "Book a call",
      goToPhrase: "Go to phrase",
    },
    services: {
      eyebrow: "What We Do",
      title: "Our Services",
      items: [
        {
          title: "Renovation Services",
          slug: "renovation",
          image: "/images/service-renovation.jpg",
          description:
            "Interior and exterior residential renovations including basements, bathrooms, kitchens, flooring, framing, drywall, siding, decks, brickwork, ramps, and landscaping, completed by one team.",
        },
        {
          title: "Concrete (New / Repair)",
          slug: "concrete",
          image: "/images/service-concrete.jpg",
          description:
            "New concrete pours and concrete repairs, including slabs, foundations, driveways, patios, stairs, retaining walls, and foundation crack repair using injection and structural reinforcement.",
        },
        {
          title: "Excavation & House Lifting",
          slug: "excavation-lifting",
          image: "/images/service-excavation.jpg",
          description:
            "Excavation services including trenching, grading, drainage, and site preparation, plus professional house lifting and structural support for foundation repair, replacement, stabilization, and underpinning.",
        },
        {
          title: "New Construction & Modifications",
          slug: "new-construction",
          image: "/images/service-construction.jpg",
          description:
            "New home construction, garages, and extensions, plus structural and layout modifications, managed from planning and permits to excavation, foundation, framing, and final delivery.",
        },
      ],
      learnMore: "Learn More",
    },
    about: {
      eyebrow: "About Us",
      titleLineOne: "Try us and you'll see that it's not just website text",
      titleLineTwo: "it's how our company is structured to plan, manage and deliver every project.",
      slides: [
        { src: "/images/about-real/about-01.jpeg", alt: "TM Contracting project photo 1" },
        { src: "/images/about-real/about-02.jpeg", alt: "TM Contracting project photo 2" },
        { src: "/images/about-real/about-03.jpeg", alt: "TM Contracting project photo 3" },
        { src: "/images/about-real/about-04.jpeg", alt: "TM Contracting project photo 4" },
        { src: "/images/about-real/about-05.jpeg", alt: "TM Contracting project photo 5" },
        { src: "/images/about-real/about-06.jpeg", alt: "TM Contracting project photo 6" },
        { src: "/images/about-real/about-07.jpeg", alt: "TM Contracting project photo 7" },
        { src: "/images/about-real/about-08.jpeg", alt: "TM Contracting project photo 8" },
        { src: "/images/about-real/about-09.jpeg", alt: "TM Contracting project photo 9" },
        { src: "/images/about-real/about-10.jpeg", alt: "TM Contracting project photo 10" },
        { src: "/images/about-real/about-11.jpeg", alt: "TM Contracting project photo 11" },
        { src: "/images/about-real/about-12.jpeg", alt: "TM Contracting project photo 12" },
        { src: "/images/about-real/about-13.jpeg", alt: "TM Contracting project photo 13" },
        { src: "/images/about-real/about-14.jpeg", alt: "TM Contracting project photo 14" },
        { src: "/images/about-real/about-15.jpeg", alt: "TM Contracting project photo 15" },
        { src: "/images/about-real/about-16.jpeg", alt: "TM Contracting project photo 16" },
        { src: "/images/about-real/about-17.jpeg", alt: "TM Contracting project photo 17" },
        { src: "/images/about-real/about-18.jpeg", alt: "TM Contracting project photo 18" },
        { src: "/images/about-real/about-19.jpeg", alt: "TM Contracting project photo 19" },
      ],
      goToSlide: "Go to slide",
      note: "",
      paragraphs: [],
      sections: [
        {
          heading: "Why Us?",
          items: [
            "We don't sell services - we invest in happy clients and long-term trust.",
            "We focus on smooth, clean project completion: clear steps, clean site, and no chaos.",
            "We take on tough challenges and bring practical solutions when conditions change on site.",
            "Strong quality control with a trained in-house team and minimal subcontracting.",
            "Honest value: efficient planning to keep pricing competitive without cutting corners.",
            "Excellent after-service support - we stay available, answer questions, and stand behind our work.",
            "Organized execution: you stay informed at every step, and even for small projects we assign an administrator, a project manager, and a site manager with a dedicated crew to keep everything on track.",
          ],
        },
        {
          heading: "Who We Are?",
          items: [
            "A professional contracting & construction company built on real field experience and customer-first service.",
            "Hands-on management with clear communication, planning, and site discipline.",
            "Work performed mainly by trained in-house employees, with limited subcontracting to keep quality consistent.",
            "A team structure that fits every job: administrator + project manager + site manager + crew, even on smaller projects.",
          ],
        },
        {
          heading: "Where?",
          items: [
            "Based in Gatineau, Ottawa, and Montreal.",
            "Serving all surrounding cities within a 2-hour drive of these areas.",
            "Examples: Aylmer, Hull, Buckingham, Masson-Angers, Chelsea, Cantley, Val-des-Monts, Wakefield, Ottawa area (Kanata, Nepean, Orleans, Barrhaven), and Montreal area (Laval, Longueuil, Terrebonne, Repentigny).",
          ],
        },
      ],
      warranty: {
        title: "3-Year Risk-Free Warranty",
        body: "Every project we complete is covered 100%. If anything we did isn't right, we fix it - no debates, no excuses. Real peace of mind, backed by real accountability.",
      },
      stats: [
        { value: "15+", label: "Years of Experience" },
        { value: "500+", label: "Projects Completed" },
        { value: "3-Year", label: "Risk-Free Warranty" },
        { value: "A to Z", label: "One Team, Every Phase" },
      ],
      cta: "Our Story",
    },
    reviews: {
      eyebrow: "What Our Clients Say",
      title: "Real Reviews. Real Results.",
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Let's Start Your Project",
      tabs: {
        quote: "Get a Quote",
        contact: "Contact Us",
        career: "Career",
      },
      success: {
        title: "Message Sent",
        body: "We received your submission and will get back to you shortly.",
        reset: "Submit another",
      },
      forms: {
        requiredNotice: "Fields marked with an asterisk are required.",
        submitIdle: "Send Message ->",
        submitLoading: "Sending...",
        selectTimePlaceholder: "Select a time...",
        timeOptions: [
          "Morning (8am - 12pm)",
          "Afternoon (12pm - 5pm)",
          "Evening (5pm - 8pm)",
        ],
        fileInput: {
          chooseSingle: "Choose file...",
          chooseMultiple: "Choose files...",
          selectedSingle: "{count} file selected",
          selectedMultiple: "{count} files selected",
        },
        career: {
          fullName: "Full Name",
          city: "City of Residence",
          phone: "Phone Number",
          email: "Email",
          workAuthorization: "Work Authorization in Canada",
          workAuthorizationPlaceholder: "Select one...",
          workAuthorizationOptions: ["Canadian Citizen", "Permanent Resident", "Open Work Permit"],
          driversLicense: "Do you have a valid driver's license?",
          driversLicenseOptions: ["Yes", "No"],
          languages: "Which languages do you speak?",
          languagesPlaceholder: "Select one...",
          languageOptions: ["English", "French", "Both"],
          cv: "CV (PDF or Word)",
          coverLetter: "Cover Letter (PDF or Word)",
          photo: "Portrait or Photo",
        },
        quote: {
          fullName: "Full Name",
          phone: "Phone Number",
          email: "Email",
          address: "Project Address",
          description: "Project Description",
          descriptionPlaceholder: "Describe the scope of work, timeline, and any specific requirements...",
          photos: "Site Photos or Any Existing Drawing",
        },
        contact: {
          name: "Name",
          phone: "Phone Number",
          email: "Email",
          sector: "Sector",
          sectorPlaceholder: "Select your sector...",
          sectorOptions: [...contactSectorOptionsEn],
          preferredWindow: "Preferred Time to Call",
          preferredTimeToggle: "I have a specific time I would like to be called",
          preferredTimeHint: "Only choose this if you want us to call at a custom date and time.",
          preferredTime: "Preferred Date & Time to Call",
        },
      },
      mapTitle: "TM Contracting location",
      officeTitle: "TM Contracting Inc.",
      regionPrimary: "Ottawa-Gatineau Region",
      regionSecondary: "Quebec & Ontario",
      serving: "Serving Quebec & Ontario.",
    },
    emails: {
      contact: {
        subjectPrefix: "New Contact Request",
        heading: "New Contact Request",
        name: "Name",
        phone: "Phone",
        email: "Email",
        sector: "Sector",
        preferredWindow: "Preferred Time to Call",
        preferredTime: "Preferred Date & Time to Call",
      },
      quote: {
        subjectPrefix: "New Quote Request",
        heading: "New Quote Request",
        fullName: "Full Name",
        phone: "Phone",
        email: "Email",
        address: "Address",
        description: "Project Description",
        photos: "Photos",
        photoLabel: "Photo",
      },
      career: {
        subjectPrefix: "New Career Application",
        heading: "New Career Application",
        fullName: "Full Name",
        city: "City of Residence",
        phone: "Phone",
        email: "Email",
        workAuthorization: "Work Authorization in Canada",
        driversLicense: "Valid Driver's License",
        languages: "Languages",
        cv: "CV",
        downloadCv: "Download CV",
        coverLetter: "Cover Letter",
        downloadCoverLetter: "Download Cover Letter",
        photo: "Portrait or Photo",
        viewPhoto: "View Photo",
      },
    },
  },
  fr: {
    metadata: {
      title: "TM Contracting",
      description:
        "Entrepreneur général clé en main, de l'excavation à la remise des clés. Garantie sans risque de 3 ans. Au service du Québec et de l'Ontario. TM Contracting.",
    },
    navbar: {
      logoAlt: "TM Contracting",
      home: "Accueil",
      services: "Services",
      onlineEstimate: "Estimation en ligne",
      career: "Carrière",
      faq: "FAQ",
      contactUs: "Nous joindre",
      toggleMenu: "Ouvrir le menu",
    },
    hero: {
      phrases: [
        {
          label: "PARCE QUE VOUS LE MÉRITEZ",
          heading: "Garantie sans risque de 3 ans",
          body: "Notre garantie sans risque de 3 ans signifie zéro risque pour vous : elle couvre 100 % de notre travail, et si quelque chose n'est pas conforme, on le corrige, sans débat et sans excuse. C'est simple : vous obtenez une vraie tranquillité d'esprit, appuyée par une vraie responsabilité.",
        },
        {
          label: "PARCE QUE VOUS LE MÉRITEZ",
          heading: "Une seule équipe, de A à Z",
          body: "Nous prenons votre projet en charge de A à Z - de l'excavation à la remise des clés - avec une seule équipe responsable de chaque étape. Nous gérons la planification, les corps de métier, les matériaux, l'échéancier et la coordination du chantier pour vous offrir un seul point de contact et zéro casse-tête.",
        },
        {
          label: "PARCE QUE VOUS LE MÉRITEZ",
          heading: "Estimations rapides, sans attente",
          body: "Rendez-vous rapides en ligne ou sur place, et une fois votre plage horaire réservée, vous pouvez souvent obtenir une estimation claire et un plan d'action concret en quelques minutes - généralement après un court appel ou une vidéo accompagnée de quelques photos.",
        },
      ],
      provinces: ["Québec", "Ontario"],
      bookCall: "Planifier un appel",
      goToPhrase: "Aller à l'énoncé",
    },
    services: {
      eyebrow: "Ce que nous faisons",
      title: "Nos services",
      items: [
        {
          title: "Rénovation",
          slug: "renovation",
          image: "/images/service-renovation.jpg",
          description:
            "Des rénovations de cuisine et de salle de bain jusqu'aux transformations intérieures complètes - nous modernisons votre espace avec précision et en limitant au maximum l'impact sur votre quotidien.",
        },
        {
          title: "Béton (Neuf / Réparation)",
          slug: "concrete",
          image: "/images/service-concrete.jpg",
          description:
            "Fondations, dalles, entrées et finis décoratifs. Nos travaux de béton sont conçus pour durer, avec une expertise solide au coffrage, au coulage et à la finition sur chaque projet.",
        },
        {
          title: "Excavation et levage",
          slug: "excavation-lifting",
          image: "/images/service-excavation.jpg",
          description:
            "Préparation de terrain, nivellement, excavation de fondation et levage de structure réalisés par des opérateurs expérimentés et une flotte d'équipement lourd.",
        },
        {
          title: "Construction neuve",
          slug: "new-construction",
          image: "/images/service-construction.jpg",
          description:
            "Des constructions complètes à partir du sol - nous gérons chaque étape jusqu'à la remise des clés, avec une seule équipe responsable et aucune confusion entre sous-traitants.",
        },
      ],
      learnMore: "En savoir plus",
    },
    about: {
      eyebrow: "À propos",
      titleLineOne: "Essayez-nous et vous verrez que ce n'est pas juste du texte sur un site web",
      titleLineTwo: "c'est la façon dont notre entreprise est structurée pour planifier, gérer et livrer chaque projet.",
      slides: [
        { src: "/images/about-real/about-01.jpeg", alt: "Photo de projet TM Contracting 1" },
        { src: "/images/about-real/about-02.jpeg", alt: "Photo de projet TM Contracting 2" },
        { src: "/images/about-real/about-03.jpeg", alt: "Photo de projet TM Contracting 3" },
        { src: "/images/about-real/about-04.jpeg", alt: "Photo de projet TM Contracting 4" },
        { src: "/images/about-real/about-05.jpeg", alt: "Photo de projet TM Contracting 5" },
        { src: "/images/about-real/about-06.jpeg", alt: "Photo de projet TM Contracting 6" },
        { src: "/images/about-real/about-07.jpeg", alt: "Photo de projet TM Contracting 7" },
        { src: "/images/about-real/about-08.jpeg", alt: "Photo de projet TM Contracting 8" },
        { src: "/images/about-real/about-09.jpeg", alt: "Photo de projet TM Contracting 9" },
        { src: "/images/about-real/about-10.jpeg", alt: "Photo de projet TM Contracting 10" },
        { src: "/images/about-real/about-11.jpeg", alt: "Photo de projet TM Contracting 11" },
        { src: "/images/about-real/about-12.jpeg", alt: "Photo de projet TM Contracting 12" },
        { src: "/images/about-real/about-13.jpeg", alt: "Photo de projet TM Contracting 13" },
        { src: "/images/about-real/about-14.jpeg", alt: "Photo de projet TM Contracting 14" },
        { src: "/images/about-real/about-15.jpeg", alt: "Photo de projet TM Contracting 15" },
        { src: "/images/about-real/about-16.jpeg", alt: "Photo de projet TM Contracting 16" },
        { src: "/images/about-real/about-17.jpeg", alt: "Photo de projet TM Contracting 17" },
        { src: "/images/about-real/about-18.jpeg", alt: "Photo de projet TM Contracting 18" },
        { src: "/images/about-real/about-19.jpeg", alt: "Photo de projet TM Contracting 19" },
      ],
      goToSlide: "Aller à la diapositive",
      note: "",
      paragraphs: [],
      sections: [
        {
          heading: "Pourquoi nous ?",
          items: [
            "Nous ne vendons pas simplement des services - nous investissons dans des clients satisfaits et une confiance durable.",
            "Nous visons une exécution fluide et propre : des étapes claires, un chantier propre et aucun chaos.",
            "Nous relevons les défis complexes et trouvons des solutions concrètes lorsque les conditions changent sur le chantier.",
            "Contrôle de qualité rigoureux avec une équipe interne formée et un minimum de sous-traitance.",
            "Une vraie valeur : une planification efficace pour garder des prix compétitifs sans compromis sur la qualité.",
            "Excellent service après-travaux : nous restons disponibles, nous répondons aux questions et nous assumons notre travail.",
            "Exécution organisée : vous restez informé à chaque étape, et même pour les petits projets nous assignons un administrateur, un chargé de projet et un responsable de chantier avec une équipe dédiée pour que tout reste sur la bonne voie.",
          ],
        },
        {
          heading: "Qui sommes-nous ?",
          items: [
            "Une entreprise professionnelle en construction et en rénovation fondée sur une vraie expérience de terrain et un service centré sur le client.",
            "Une gestion concrète avec une communication claire, une bonne planification et une discipline de chantier.",
            "Des travaux exécutés principalement par des employés internes formés, avec une sous-traitance limitée pour garder une qualité constante.",
            "Une structure d'équipe adaptée à chaque projet : administrateur + chargé de projet + responsable de chantier + équipe, même pour les plus petits mandats.",
          ],
        },
        {
          heading: "Où ?",
          items: [
            "Basés à Gatineau, Ottawa et Montréal.",
            "Nous desservons toutes les villes situées dans un rayon d'environ 2 heures de ces secteurs.",
            "Exemples : Aylmer, Hull, Buckingham, Masson-Angers, Chelsea, Cantley, Val-des-Monts, Wakefield, la région d'Ottawa (Kanata, Nepean, Orleans, Barrhaven) et la région de Montréal (Laval, Longueuil, Terrebonne, Repentigny).",
          ],
        },
      ],
      warranty: {
        title: "Garantie sans risque de 3 ans",
        body: "Chaque projet que nous réalisons est couvert à 100 %. Si quelque chose n'est pas conforme à ce que nous avons fait, nous le corrigeons - sans débat et sans excuse. Une vraie tranquillité d'esprit, soutenue par une vraie responsabilité.",
      },
      stats: [
        { value: "15+", label: "Années d'expérience" },
        { value: "500+", label: "Projets réalisés" },
        { value: "3 ans", label: "Garantie sans risque" },
        { value: "A à Z", label: "Une équipe, chaque étape" },
      ],
      cta: "Notre histoire",
    },
    reviews: {
      eyebrow: "Ce que disent nos clients",
      title: "De vrais avis. De vrais résultats.",
    },
    contact: {
      eyebrow: "Parlons de votre projet",
      title: "Commençons votre projet",
      tabs: {
        quote: "Obtenir une soumission",
        contact: "Nous joindre",
        career: "Carrière",
      },
      success: {
        title: "Message envoyé",
        body: "Nous avons bien reçu votre demande et nous vous répondrons sous peu.",
        reset: "Envoyer une autre demande",
      },
      forms: {
        requiredNotice: "Les champs marqués d'un astérisque sont obligatoires.",
        submitIdle: "Envoyer le message ->",
        submitLoading: "Envoi en cours...",
        selectTimePlaceholder: "Choisir un moment...",
        timeOptions: [
          "Matin (8 h - 12 h)",
          "Après-midi (12 h - 17 h)",
          "Soir (17 h - 20 h)",
        ],
        fileInput: {
          chooseSingle: "Choisir un fichier...",
          chooseMultiple: "Choisir des fichiers...",
          selectedSingle: "{count} fichier sélectionné",
          selectedMultiple: "{count} fichiers sélectionnés",
        },
        career: {
          fullName: "Nom complet",
          city: "Ville de résidence",
          phone: "Numéro de téléphone",
          email: "Courriel",
          workAuthorization: "Autorisation de travail au Canada",
          workAuthorizationPlaceholder: "Choisissez une option...",
          workAuthorizationOptions: ["Citoyen canadien", "Résident permanent", "Permis de travail ouvert"],
          driversLicense: "Avez-vous un permis de conduire valide ?",
          driversLicenseOptions: ["Oui", "Non"],
          languages: "Quelles langues parlez-vous ?",
          languagesPlaceholder: "Choisissez une option...",
          languageOptions: ["Anglais", "Français", "Les deux"],
          cv: "CV (PDF ou Word)",
          coverLetter: "Lettre de motivation (PDF ou Word)",
          photo: "Portrait ou photo",
        },
        quote: {
          fullName: "Nom complet",
          phone: "Numéro de téléphone",
          email: "Courriel",
          address: "Adresse du projet",
          description: "Description du projet",
          descriptionPlaceholder: "Décrivez l'ampleur des travaux, l'échéancier et toute exigence particulière...",
          photos: "Photos du chantier ou dessin existant",
        },
        contact: {
          name: "Nom",
          phone: "Numéro de téléphone",
          email: "Courriel",
          sector: "Secteur",
          sectorPlaceholder: "Sélectionnez votre secteur...",
          sectorOptions: [...contactSectorOptionsFr],
          preferredWindow: "Moment préféré pour l'appel",
          preferredTimeToggle: "J'ai un moment précis où je souhaite être appelé",
          preferredTimeHint: "Choisissez cette option seulement si vous voulez un appel à une date et une heure précises.",
          preferredTime: "Date et heure préférées pour l'appel",
        },
      },
      mapTitle: "Emplacement de TM Contracting",
      officeTitle: "TM Contracting Inc.",
      regionPrimary: "Région d'Ottawa-Gatineau",
      regionSecondary: "Québec et Ontario",
      serving: "Au service du Québec et de l'Ontario.",
    },
    emails: {
      contact: {
        subjectPrefix: "Nouvelle demande de contact",
        heading: "Nouvelle demande de contact",
        name: "Nom",
        phone: "Téléphone",
        email: "Courriel",
        sector: "Secteur",
        preferredWindow: "Moment préféré pour l'appel",
        preferredTime: "Date et heure préférées pour l'appel",
      },
      quote: {
        subjectPrefix: "Nouvelle demande de soumission",
        heading: "Nouvelle demande de soumission",
        fullName: "Nom complet",
        phone: "Téléphone",
        email: "Courriel",
        address: "Adresse",
        description: "Description du projet",
        photos: "Photos",
        photoLabel: "Photo",
      },
      career: {
        subjectPrefix: "Nouvelle candidature",
        heading: "Nouvelle candidature",
        fullName: "Nom complet",
        city: "Ville de résidence",
        phone: "Téléphone",
        email: "Courriel",
        workAuthorization: "Autorisation de travail au Canada",
        driversLicense: "Permis de conduire valide",
        languages: "Langues",
        cv: "CV",
        downloadCv: "Télécharger le CV",
        coverLetter: "Lettre de motivation",
        downloadCoverLetter: "Télécharger la lettre de motivation",
        photo: "Portrait ou photo",
        viewPhoto: "Voir la photo",
      },
    },
  },
}
