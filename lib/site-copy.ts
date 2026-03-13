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

export type SiteCopy = {
  metadata: {
    title: string
    description: string
  }
  navbar: {
    logoAlt: string
    home: string
    services: string
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
    slides: Slide[]
    goToSlide: string
    titleLineOne: string
    titleLineTwo: string
    paragraphs: string[]
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
        phone: string
        email: string
        questionnaire: string
        questionnairePlaceholder: string
        cv: string
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
      phone: string
      email: string
      questionnaire: string
      cv: string
      downloadCv: string
      photo: string
      viewPhoto: string
    }
  }
}

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    metadata: {
      title: "TM Contracting | Since 1991",
      description:
        "Full-service general contracting from excavation to keys. 3-Year Risk-Free Warranty. Serving Quebec and Ontario. TM Contracting.",
    },
    navbar: {
      logoAlt: "TM Contracting Since 1991",
      home: "Home",
      services: "Services",
      career: "Career",
      faq: "FAQ",
      contactUs: "Contact us",
      toggleMenu: "Toggle menu",
    },
    hero: {
      phrases: [
        {
          label: "BECAUSE YOU DESERVE",
          heading: "3-YEARS RISK-FREE Warranty",
          body: "Our 3-YEARS RISK-FREE Warranty means zero risk for you: it covers 100% of our work, and if anything we did isn't right, we fix it - no debates, no excuses. It's simple: you get real peace of mind, backed by real accountability.",
        },
        {
          label: "BECAUSE YOU DESERVE",
          heading: "One Team, A to Z",
          body: "We handle your project A to Z - excavation to keys - with one accountable team managing every phase. We take care of planning, trades, materials, scheduling, and site coordination, so you get one point of contact and zero headache.",
        },
        {
          label: "BECAUSE YOU DESERVE",
          heading: "Fast Estimates, Zero Wait",
          body: "Fast online or in-person appointments, and once you book a time slot, you can often get a clear estimate and a practical game plan within minutes - usually from a short call or video plus a few photos.",
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
          title: "Renovation",
          slug: "renovation",
          image: "/images/service-renovation.jpg",
          description:
            "From kitchen and bathroom upgrades to full interior transformations - we modernize your space with precision craftsmanship and minimal disruption to your daily life.",
        },
        {
          title: "Concrete",
          slug: "concrete",
          image: "/images/service-concrete.jpg",
          description:
            "Foundations, slabs, driveways, and decorative finishes. Our concrete work is built to last, with expert forming, pouring, and finishing on every project.",
        },
        {
          title: "Excavation & Lifting",
          slug: "excavation-lifting",
          image: "/images/service-excavation.jpg",
          description:
            "Site preparation, grading, foundation excavation, and structural lifting handled by our experienced operators and heavy equipment fleet.",
        },
        {
          title: "New Construction",
          slug: "new-construction",
          image: "/images/service-construction.jpg",
          description:
            "Full builds from the ground up - we manage every phase from excavation to final keys, with one accountable team and zero subcontractor confusion.",
        },
      ],
      learnMore: "Learn More",
    },
    about: {
      eyebrow: "About Us",
      slides: [
        { src: "/images/about-site-1.jpg", alt: "Crew pouring concrete foundation on site" },
        { src: "/images/about-site-2.jpg", alt: "Completed kitchen renovation project" },
        { src: "/images/about-site-3.jpg", alt: "Excavation work with heavy machinery" },
        { src: "/images/about-site-4.jpg", alt: "New construction framing phase" },
        { src: "/images/about-site-5.jpg", alt: "Finished custom home exterior" },
      ],
      goToSlide: "Go to slide",
      titleLineOne: "Built on Trust.",
      titleLineTwo: "Backed by Results.",
      paragraphs: [
        "TM Contracting has been a trusted name in construction since 1991 - over 15 years of hands-on experience transforming properties across Quebec and Ontario.",
        "We handle everything from excavation to final keys as one unified team. No revolving door of subcontractors, no miscommunication, no finger-pointing. One accountable team manages every phase - planning, trades, materials, scheduling, and site coordination.",
        "What sets us apart is simple: we treat your project like our own. That means showing up on time, being transparent at every step, and standing firmly behind our work.",
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
          phone: "Phone Number",
          email: "Email",
          questionnaire: "Why do you want to join TM Contracting?",
          questionnairePlaceholder: "Tell us about yourself and what drives you...",
          cv: "CV (PDF or Word)",
          photo: "Photo",
        },
        quote: {
          fullName: "Full Name",
          phone: "Phone Number",
          email: "Email",
          address: "Project Address",
          description: "Project Description",
          descriptionPlaceholder: "Describe the scope of work, timeline, and any specific requirements...",
          photos: "Project Photos (multiple allowed)",
        },
        contact: {
          name: "Name",
          phone: "Phone Number",
          preferredTime: "Preferred Time to Call",
        },
      },
      mapTitle: "TM Contracting location",
      officeTitle: "TM Contracting Inc.",
      regionPrimary: "Ottawa-Gatineau Region",
      regionSecondary: "Quebec & Ontario",
      serving: "Serving Quebec & Ontario since 1991.",
    },
    emails: {
      contact: {
        subjectPrefix: "New Contact Request",
        heading: "New Contact Request",
        name: "Name",
        phone: "Phone",
        preferredTime: "Preferred Call Time",
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
        phone: "Phone",
        email: "Email",
        questionnaire: "Questionnaire",
        cv: "CV",
        downloadCv: "Download CV",
        photo: "Photo",
        viewPhoto: "View Photo",
      },
    },
  },
  fr: {
    metadata: {
      title: "TM Contracting | Depuis 1991",
      description:
        "Entrepreneur général clé en main, de l'excavation à la remise des clés. Garantie sans risque de 3 ans. Au service du Québec et de l'Ontario. TM Contracting.",
    },
    navbar: {
      logoAlt: "TM Contracting depuis 1991",
      home: "Accueil",
      services: "Services",
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
          title: "Béton",
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
      slides: [
        { src: "/images/about-site-1.jpg", alt: "Équipe qui coule une fondation de béton sur un chantier" },
        { src: "/images/about-site-2.jpg", alt: "Projet de rénovation de cuisine terminé" },
        { src: "/images/about-site-3.jpg", alt: "Travaux d'excavation avec machinerie lourde" },
        { src: "/images/about-site-4.jpg", alt: "Phase de charpente d'une construction neuve" },
        { src: "/images/about-site-5.jpg", alt: "Extérieur d'une maison sur mesure terminée" },
      ],
      goToSlide: "Aller à la diapositive",
      titleLineOne: "Fondé sur la confiance.",
      titleLineTwo: "Appuyé par les résultats.",
      paragraphs: [
        "TM Contracting est un nom de confiance dans la construction depuis 1991 - avec plus de 15 ans d'expérience concrète à transformer des propriétés partout au Québec et en Ontario.",
        "Nous prenons tout en charge, de l'excavation à la remise des clés, comme une seule équipe unifiée. Pas de rotation interminable de sous-traitants, pas de mauvaise communication, pas de renvoi de responsabilité. Une équipe responsable gère chaque phase - planification, corps de métier, matériaux, échéancier et coordination du chantier.",
        "Ce qui nous distingue est simple : nous traitons votre projet comme si c'était le nôtre. Cela signifie arriver à temps, être transparents à chaque étape et assumer pleinement notre travail.",
      ],
      warranty: {
        title: "Garantie sans risque de 3 ans",
        body: "Chaque projet que nous réalisons est couvert à 100 %. Si quelque chose n'est pas conforme à ce que nous avons fait, nous le corrigeons - sans débat et sans excuse. Une vraie tranquillité d'esprit, soutenue par une vraie responsabilité.",
      },
      stats: [
        { value: "15+", label: "Ans d'expérience" },
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
          phone: "Numéro de téléphone",
          email: "Courriel",
          questionnaire: "Pourquoi souhaitez-vous vous joindre à TM Contracting ?",
          questionnairePlaceholder: "Parlez-nous de vous et de ce qui vous motive...",
          cv: "CV (PDF ou Word)",
          photo: "Photo",
        },
        quote: {
          fullName: "Nom complet",
          phone: "Numéro de téléphone",
          email: "Courriel",
          address: "Adresse du projet",
          description: "Description du projet",
          descriptionPlaceholder: "Décrivez l'ampleur des travaux, l'échéancier et toute exigence particulière...",
          photos: "Photos du projet (plusieurs permises)",
        },
        contact: {
          name: "Nom",
          phone: "Numéro de téléphone",
          preferredTime: "Moment préféré pour l'appel",
        },
      },
      mapTitle: "Emplacement de TM Contracting",
      officeTitle: "TM Contracting Inc.",
      regionPrimary: "Région d'Ottawa-Gatineau",
      regionSecondary: "Québec et Ontario",
      serving: "Au service du Québec et de l'Ontario depuis 1991.",
    },
    emails: {
      contact: {
        subjectPrefix: "Nouvelle demande de contact",
        heading: "Nouvelle demande de contact",
        name: "Nom",
        phone: "Téléphone",
        preferredTime: "Moment préféré pour l'appel",
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
        phone: "Téléphone",
        email: "Courriel",
        questionnaire: "Questionnaire",
        cv: "CV",
        downloadCv: "Télécharger le CV",
        photo: "Photo",
        viewPhoto: "Voir la photo",
      },
    },
  },
}
