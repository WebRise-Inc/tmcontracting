import type { Locale } from "@/lib/site-copy"
import { getSampleProjectLocation } from "@/lib/sample-project-locations"

export const serviceSlugs = [
  "renovation",
  "concrete",
  "excavation-lifting",
  "new-construction",
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]

type ServiceHighlight = {
  value: string
  label: string
}

type ServiceGroup = {
  title: string
  items: string[]
}

type ServiceStep = {
  title: string
  body: string
}

type ServicePageEntry = {
  title: string
  eyebrow: string
  summary: string
  description: string
  scopeTitle?: string
  scopeDescription?: string
  highlights: ServiceHighlight[]
  groups: ServiceGroup[]
  processIntro: string
  process: ServiceStep[]
  galleryIntro: string
  ctaTitle: string
  ctaBody: string
  metadata: {
    title: string
    description: string
  }
}

type ServiceChrome = {
  breadcrumbHome: string
  breadcrumbServices: string
  heroLabel: string
  scopeTitle: string
  processTitle: string
  galleryTitle: string
  relatedTitle: string
  relatedBody: string
  primaryCta: string
  secondaryCta: string
  galleryPhotoLabel: string
}

type ServicePageLocale = {
  chrome: ServiceChrome
  services: Record<ServiceSlug, ServicePageEntry>
}

const galleryCounts: Record<ServiceSlug, number> = {
  renovation: 33,
  concrete: 16,
  "excavation-lifting": 10,
  "new-construction": 11,
}

type HomepageServiceGallerySlide = {
  src: string
  locationLabel: string
  objectPosition?: string
}

export type ServiceGalleryImage = {
  src: string
  locationLabel: string
  objectPosition?: string
}

function buildNumberedGalleryEntries(
  slug: ServiceSlug,
  count: number,
  startIndex = 0,
): ServiceGalleryImage[] {
  return Array.from({ length: count }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0")

    return {
      src: `/images/service-galleries/${slug}/${imageNumber}.jpeg`,
      locationLabel: getSampleProjectLocation(startIndex + index),
    }
  })
}

const featuredExcavationGallery: ServiceGalleryImage[] = [
  {
    src: "/images/service-galleries/excavation-lifting/featured-01.jpeg",
    locationLabel: getSampleProjectLocation(0),
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-06.jpeg",
    locationLabel: getSampleProjectLocation(1),
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-09.jpeg",
    locationLabel: getSampleProjectLocation(2),
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-02.jpeg",
    locationLabel: getSampleProjectLocation(3),
    objectPosition: "center 35%",
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-08.jpeg",
    locationLabel: getSampleProjectLocation(4),
    objectPosition: "center 32%",
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-03.jpeg",
    locationLabel: getSampleProjectLocation(5),
    objectPosition: "center 34%",
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-04.jpeg",
    locationLabel: getSampleProjectLocation(6),
    objectPosition: "center 34%",
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-05.jpeg",
    locationLabel: getSampleProjectLocation(7),
    objectPosition: "center 28%",
  },
  {
    src: "/images/service-galleries/excavation-lifting/featured-07.jpeg",
    locationLabel: getSampleProjectLocation(8),
    objectPosition: "center 34%",
  },
]

const serviceGallerySelections: Partial<Record<ServiceSlug, ServiceGalleryImage[]>> = {
  "excavation-lifting": [
    ...featuredExcavationGallery,
    ...buildNumberedGalleryEntries("excavation-lifting", galleryCounts["excavation-lifting"], featuredExcavationGallery.length),
  ],
}

const SHARED_SERVICE_PROCESS_INTRO_EN = ""

const SHARED_SERVICE_PROCESS_EN: ServiceStep[] = [
  {
    title: "Free Consultation, Online or On Site",
    body: "Free online and on-site consultations, often within 24 hours. We assess your needs, discuss possible solutions, answer your questions, and provide a preliminary average cost estimate.",
  },
  {
    title: "Detailed Technical Quotation & Clear Scope",
    body: "A detailed and technically structured quotation outlining the scope of work, execution steps, materials, timeline, and pricing with full clarity. Give you a professional and well-defined proposal so you can review the project confidently and make a clear decision without uncertainty.",
  },
  {
    title: "Live Coordination & Recorded Updates",
    body: "After confirmation, a group is created with the client, our team, and any involved subcontractors. Through this group, we share moment-by-moment updates, site arrival and departure times, progress photos, questions, answers, and key decisions, so the client remains fully involved at all times, even without being physically present, while keeping the entire process clearly documented and authenticated.",
  },
  {
    title: "Completion, Adjustments & Warranty",
    body: "If any issue, detail, or correction is identified during the work and falls within our quotation, our team takes care of it directly without unnecessary delays, complications, or extra headaches. Our 3 Years Risk-Free Warranty stands behind the work to give you confidence that the decision you made was the right one.",
  },
]

const SHARED_SERVICE_PROCESS_INTRO_FR = ""

const SHARED_SERVICE_PROCESS_FR: ServiceStep[] = [
  {
    title: "Consultation gratuite, en ligne ou sur place",
    body: "Consultations gratuites en ligne et sur place, souvent dans les 24 heures. Nous évaluons vos besoins, discutons des solutions possibles, répondons à vos questions et fournissons une estimation préliminaire du coût moyen.",
  },
  {
    title: "Soumission technique détaillée et portée claire",
    body: "Une soumission détaillée et techniquement structurée décrivant la portée des travaux, les étapes d'exécution, les matériaux, l'échéancier et les prix avec une clarté complète. Elle vous donne une proposition professionnelle et bien définie afin que vous puissiez examiner le projet avec confiance et prendre une décision claire sans incertitude.",
  },
  {
    title: "Coordination en direct et mises à jour consignées",
    body: "Après la confirmation, un groupe est créé avec le client, notre équipe et tous les sous-traitants impliqués. Par l'entremise de ce groupe, nous partageons les mises à jour au fur et à mesure, les heures d'arrivée et de départ au chantier, les photos d'avancement, les questions, les réponses et les décisions clés, afin que le client demeure pleinement impliqué en tout temps, même sans être physiquement sur place, tout en gardant l'ensemble du processus clairement documenté et authentifié.",
  },
  {
    title: "Achèvement, ajustements et garantie",
    body: "Si un problème, un détail ou une correction est relevé pendant les travaux et entre dans notre soumission, notre équipe s'en charge directement sans délais inutiles, complications ou casse-tête supplémentaire. Notre garantie sans risque de 3 ans couvre les travaux pour vous donner confiance que la décision que vous avez prise était la bonne.",
  },
]

// Curated homepage subsets prioritize variety inside the tighter card crop.
const homepageGallerySelections: Record<ServiceSlug, HomepageServiceGallerySlide[]> = {
  renovation: [
    { src: "/images/homepage-service-slides/renovation/01.jpeg", locationLabel: getSampleProjectLocation(0) },
    { src: "/images/homepage-service-slides/renovation/02.jpeg", locationLabel: getSampleProjectLocation(1) },
    { src: "/images/homepage-service-slides/renovation/03.jpeg", locationLabel: getSampleProjectLocation(2) },
    { src: "/images/homepage-service-slides/renovation/04.jpeg", locationLabel: getSampleProjectLocation(3) },
    { src: "/images/homepage-service-slides/renovation/05.jpeg", locationLabel: getSampleProjectLocation(4) },
  ],
  concrete: [
    { src: "/images/homepage-service-slides/concrete/01.jpeg", locationLabel: getSampleProjectLocation(5) },
    { src: "/images/homepage-service-slides/concrete/02.jpeg", locationLabel: getSampleProjectLocation(6) },
    { src: "/images/homepage-service-slides/concrete/03.jpeg", locationLabel: getSampleProjectLocation(7) },
    { src: "/images/homepage-service-slides/concrete/04.jpeg", locationLabel: getSampleProjectLocation(8) },
    { src: "/images/homepage-service-slides/concrete/05.jpeg", locationLabel: getSampleProjectLocation(9) },
  ],
  "excavation-lifting": [
    {
      src: "/images/service-galleries/excavation-lifting/featured-01.jpeg",
      locationLabel: getSampleProjectLocation(10),
    },
    {
      src: "/images/service-galleries/excavation-lifting/featured-06.jpeg",
      locationLabel: getSampleProjectLocation(11),
    },
    {
      src: "/images/service-galleries/excavation-lifting/featured-09.jpeg",
      locationLabel: getSampleProjectLocation(12),
    },
    {
      src: "/images/service-galleries/excavation-lifting/featured-02.jpeg",
      locationLabel: getSampleProjectLocation(13),
      objectPosition: "center 35%",
    },
    {
      src: "/images/service-galleries/excavation-lifting/featured-08.jpeg",
      locationLabel: getSampleProjectLocation(14),
      objectPosition: "center 32%",
    },
  ],
  "new-construction": [
    { src: "/images/homepage-service-slides/new-construction/01.jpeg", locationLabel: getSampleProjectLocation(15) },
    { src: "/images/homepage-service-slides/new-construction/02.jpeg", locationLabel: getSampleProjectLocation(16) },
    { src: "/images/homepage-service-slides/new-construction/03.jpeg", locationLabel: getSampleProjectLocation(17) },
    { src: "/images/homepage-service-slides/new-construction/04.jpeg", locationLabel: getSampleProjectLocation(18) },
  ],
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug)
}

export function getServiceGalleryEntries(slug: ServiceSlug): ServiceGalleryImage[] {
  return serviceGallerySelections[slug] ?? buildNumberedGalleryEntries(slug, galleryCounts[slug])
}

export function getServiceGalleryPaths(slug: ServiceSlug) {
  return getServiceGalleryEntries(slug).map((image) => image.src)
}

export function getHomepageServiceGallerySlides(slug: ServiceSlug) {
  return homepageGallerySelections[slug]
}

export const servicePages: Record<Locale, ServicePageLocale> = {
  en: {
    chrome: {
      breadcrumbHome: "Home",
      breadcrumbServices: "Services",
      heroLabel: "TM Contracting Service",
      scopeTitle: "What This Service Covers",
      processTitle: "How the Work Moves",
      galleryTitle: "Field Gallery",
      relatedTitle: "Other Services",
      relatedBody: "Need another phase handled by the same team? These services connect directly to the work above.",
      primaryCta: "Get a Quote",
      secondaryCta: "Call 1-800-430-0555",
      galleryPhotoLabel: "project photo",
    },
    services: {
      renovation: {
        title: "Renovation Services",
        eyebrow: "Interior + exterior upgrades",
        summary:
          "TM Contracting handles renovation work from start to finish through one accountable and coordinated team. Whether the project involves interior upgrades, exterior improvements, or both, we manage each phase with clear planning, technical structure, and professional execution so the client does not have to deal with the confusion of separate trades and disconnected timelines.",
        description:
          "Our difference is in the way we work: fast consultation, detailed quotations, live communication during execution, and reliable follow-through after completion. The result is a renovation process that is clear, efficient, well documented, and backed by our 3-Year Risk-Free Warranty.",
        scopeTitle: "Coordinated Interior & Exterior Renovation Work",
        scopeDescription:
          "Renovation work covers situations where interior or exterior areas can no longer properly serve the needs of the property due to wear, damage, outdated finishes, poor layout, or incomplete construction. This may be necessary when spaces require repair, modernization, reconfiguration, or coordinated improvements across multiple phases of work. By managing the project under one organized scope, the work can be completed more smoothly, more consistently, and with better control over quality, sequencing, and final results.",
        highlights: [],
        groups: [
          {
            title: "Interior renovations",
            items: [
              "Basements",
              "Bathrooms",
              "Kitchens",
              "Flooring",
              "Framing",
              "Drywall",
              "Finishing",
              "Isolation",
              "Beams",
              "Joists",
              "Posts",
              "Tiles",
            ],
          },
          {
            title: "Exterior renovations",
            items: [
              "Siding",
              "Decks",
              "Brick work",
              "Ramps",
              "Landscaping",
              "Fences and gates",
              "Stairs",
              "Soffit",
              "Pergolas",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_EN,
        process: SHARED_SERVICE_PROCESS_EN,
        galleryIntro:
          "A look at renovation work in progress, from opened-up interiors to active finishing stages on site.",
        ctaTitle: "Need renovation work handled by one team?",
        ctaBody:
          "Tell us what needs to be updated, repaired, reworked, or rebuilt, and we can help define the right scope and next step.",
        metadata: {
          title: "Renovation Services | TM Contracting",
          description:
            "Interior and exterior renovation services for basements, bathrooms, kitchens, flooring, framing, drywall, siding, decks, brick work, ramps, and landscaping.",
        },
      },
      concrete: {
        title: "Concrete Services (New / Repair)",
        eyebrow: "New pours + structural repair",
        summary:
          "NEW CONCRETE. We handle new concrete projects from start to finish with one accountable team, including slabs, foundations, retaining walls, stairs, patios, walkways, and driveways. Every phase is planned and executed with clear preparation, proper reinforcement, controlled pouring, quality finishing, and durable final delivery.",
        description:
          "REPAIR & STRUCTURAL STABILIZATION. For existing concrete and foundation problems, we provide focused repair and reinforcement solutions based on the condition of the structure. This includes crack filler, high-pressure injection, carbon fibre stitches, and underpinning where deeper support is required. Our objective is not only to repair the visible issue, but to restore stability and deliver a reliable long-term solution.",
        scopeTitle: "CONCRETE SOLUTIONS FOR NEW AND EXISTING CONDITIONS",
        scopeDescription:
          "Concrete work covers both new installations and corrective repairs where concrete surfaces or foundation areas need to be improved, replaced, or stabilized. This may include extending existing concrete, creating a cleaner walkway, upgrading a sidewalk, modernizing a driveway, or addressing cracks, deterioration, water infiltration, and structural movement. By matching the scope to the actual condition of the site, the work can be completed with a cleaner finish, stronger performance, and better long-term reliability.",
        highlights: [],
        groups: [
          {
            title: "New concrete work",
            items: [
              "Slabs",
              "Foundations",
              "Retaining walls",
              "Stairs and landings",
              "Patios",
              "Driveways",
              "Sidewalks and walkways",
              "Concrete pads",
              "Garage floors",
              "Entrance aprons",
            ],
          },
          {
            title: "Foundation crack repair",
            items: [
              "Crack filling",
              "Pressure injections",
              "Leak-point sealing",
              "Interior crack repair",
              "Exterior crack repair",
              "Localized concrete restoration",
              "Repair planning by site condition",
              "Water-infiltration treatment",
              "Crack sealing solutions",
              "Targeted repair scope",
            ],
          },
          {
            title: "Structural reinforcement",
            items: [
              "Carbon-fiber stitching",
              "Structural crack stabilization",
              "Reinforcement where required",
              "Condition-based reinforcement",
              "Localized strengthening",
              "Support for weakened concrete",
              "Active crack stabilization",
              "Repair tied to site conditions",
              "One scope for repair and support",
              "Integrated stabilization work",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_EN,
        process: SHARED_SERVICE_PROCESS_EN,
        galleryIntro:
          "Concrete work in the field, covering both new installation phases and structural repair conditions around existing residential properties.",
        ctaTitle: "Planning new concrete work or dealing with an existing structural concrete issue?",
        ctaBody:
          "Send the site details, the concrete area or foundation involved, and any photos or drawings you have. We can help determine the right scope, whether the project is new concrete, repair, stabilization, or a combination of all three.",
        metadata: {
          title: "Concrete Services | TM Contracting",
          description:
            "Concrete services for new slabs, foundations, retaining walls, stairs, patios, walkways, and driveways, plus crack filler, high-pressure injection, carbon fibre stitches, and underpinning for repair and stabilization.",
        },
      },
      "excavation-lifting": {
        title: "Excavation & House Lifting Services",
        eyebrow: "Groundwork + structural support",
        summary:
          "EXCAVATION & SITE PREPARATION. We manage excavation and site preparation work from start to finish, including trenching, grading, drainage, backfill, and preparation for foundations and slabs. Every stage is planned and executed with close attention to ground conditions, structural requirements, and proper sequencing to ensure a safe, efficient, and reliable base for the work ahead.",
        description:
          "HOUSE LIFTING & STRUCTURAL SUPPORT. For projects involving foundation repair, replacement, reinforcement, or deepening, we provide safe house lifting and structural support solutions through one coordinated team. Our services include lifting, temporary shoring, stabilization, re-leveling, and underpinning as required to protect the structure, maintain control of the process, and complete the work with clarity and accountability.",
        scopeTitle: "Excavation & House Lifting Services",
        scopeDescription:
          "excavation and elevation services when foundation problems or structural conditions cannot be properly addressed without opening the ground and temporarily supporting the build",
        highlights: [],
        groups: [
          {
            title: "EXCAVATION & SITE PREPARATION",
            items: [
              "Trenching",
              "Grading",
              "Drainage",
              "Backfilling",
              "Site preparation",
              "Excavation for foundations",
              "Slab sub-base preparation",
              "Soil removal and reshaping",
              "Access preparation",
              "Groundwork coordination",
            ],
          },
          {
            title: "HOUSE LIFTING AND SUPPORT",
            items: [
              "Safe house lifting",
              "Structural support during foundation work",
              "Temporary shoring",
              "Stabilization",
              "Load transfer planning",
              "Controlled lifting sequence",
              "Structural bracing",
              "Support for repair access",
              "Lift preparation and setup",
              "Temporary structural holding",
            ],
          },
          {
            title: "FOUNDATION STRENGTHENING",
            items: [
              "Re-leveling",
              "Underpinning",
              "Existing foundation strengthening",
              "Foundation deepening",
              "Structural stabilization",
              "Load support improvement",
              "Localized reinforcement",
              "Settlement correction",
              "Support restoration",
              "Strengthening for repair work",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_EN,
        process: SHARED_SERVICE_PROCESS_EN,
        galleryIntro:
          "Excavation, site-preparation, and lifting work in the field, showing exposed foundations, machine access, and structural support conditions.",
        ctaTitle: "Need excavation, site preparation, or house lifting tied to foundation work?",
        ctaBody:
          "If the project involves trenching, grading, drainage, exposed foundations, lifting, shoring, or underpinning, send the site details and any photos you have and we can help define the next step clearly.",
        metadata: {
          title: "Excavation & House Lifting Services | TM Contracting",
          description:
            "Excavation and site preparation services including trenching, grading, drainage, backfill, and foundation prep, plus house lifting, shoring, stabilization, re-leveling, and underpinning for structural support work.",
        },
      },
      "new-construction": {
        title: "New Construction & Building Modifications",
        eyebrow: "Ground-up builds + structural changes",
        summary:
          "NEW CONSTRUCTION. We manage new construction projects from the ground up, including homes, garages, and extensions, through one clear and accountable process. From planning and permits to excavation, foundation, framing, finishes, and final hand-off, every phase is organized to keep the project coordinated, efficient, and built to last.",
        description:
          "BUILDING MODIFICATIONS. For existing buildings, we provide modification work when changes to structure, layout, or overall functionality are needed. Whether the project involves structural adjustments, layout revisions, or expansion of the existing space, the work is handled with proper planning, disciplined execution, and full coordination under one responsible team.",
        scopeTitle: "Ground-Up Construction & Structural Modification Services",
        scopeDescription:
          "Your project requires more than basic construction work and needs a clear, fully managed process from planning to final delivery. Whether you are building a new structure or modifying an existing one, the main advantage is having one accountable team manage the technical scope, coordination, sequencing, and execution under a single direction. This reduces confusion, limits delays, keeps the work aligned from one phase to the next, and gives you a more reliable path for structural changes, additions, or complete new construction.",
        highlights: [],
        groups: [
          {
            title: "New construction",
            items: [
              "Homes",
              "Garages",
              "Extensions",
              "Additions",
              "Detached structures",
              "Foundation work",
              "Structural framing",
              "Exterior build scope",
              "New layout construction",
              "Full build coordination",
            ],
          },
          {
            title: "Building modifications",
            items: [
              "Structural changes",
              "Layout modifications",
              "Wall removal and reconfiguration",
              "Expansion of existing spaces",
              "Integration of new and existing areas",
              "Interior restructuring",
              "Open-concept conversions",
              "Framing adjustments",
              "Functional space upgrades",
              "Flow and access improvements",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_EN,
        process: SHARED_SERVICE_PROCESS_EN,
        galleryIntro:
          "Construction conditions in the field, including active site work, lifting operations, and structural build stages.",
        ctaTitle: "Starting a new build or major building modification?",
        ctaBody:
          "Share the type of building, the structural change, or the extension you are planning, and we can help define the right starting point for scope and delivery.",
        metadata: {
          title: "New Construction & Building Modifications | TM Contracting",
          description:
            "New construction and building modification services for homes, garages, extensions, structural changes, and layout modifications from planning to final delivery.",
        },
      },
    },
  },
  fr: {
    chrome: {
      breadcrumbHome: "Accueil",
      breadcrumbServices: "Services",
      heroLabel: "Service TM Contracting",
      scopeTitle: "Ce que ce service couvre",
      processTitle: "Comment le chantier avance",
      galleryTitle: "Galerie terrain",
      relatedTitle: "Autres services",
      relatedBody: "Besoin d'une autre phase prise en charge par la même équipe ? Ces services se raccordent directement au travail ci-dessus.",
      primaryCta: "Obtenir une soumission",
      secondaryCta: "Appeler le 1-800-430-0555",
      galleryPhotoLabel: "photo de projet",
    },
    services: {
      renovation: {
        title: "Services de rénovation",
        eyebrow: "Travaux intérieurs + extérieurs",
        summary:
          "TM Contracting prend en charge les travaux de rénovation du début à la fin avec une seule équipe coordonnée et responsable. Que le projet concerne des améliorations intérieures, des travaux extérieurs ou les deux, nous gérons chaque étape avec une planification claire, une structure technique et une exécution professionnelle afin que le client n'ait pas à composer avec la confusion de corps de métier séparés et d'échéanciers déconnectés.",
        description:
          "Notre différence se voit dans notre façon de travailler : consultation rapide, soumissions détaillées, communication en direct pendant l'exécution et suivi fiable après la fin des travaux. Le résultat est un processus de rénovation clair, efficace, bien documenté et appuyé par notre garantie sans risque de 3 ans.",
        scopeTitle: "Travaux de rénovation intérieure et extérieure coordonnés",
        scopeDescription:
          "Les travaux de rénovation couvrent les situations où les espaces intérieurs ou extérieurs ne répondent plus correctement aux besoins de la propriété en raison de l'usure, de dommages, de finis dépassés, d'un mauvais aménagement ou de travaux incomplets. Cela peut être nécessaire lorsque des espaces demandent une réparation, une modernisation, une reconfiguration ou des améliorations coordonnées sur plusieurs phases de travail. En gérant le projet sous une seule portée organisée, les travaux peuvent être réalisés plus fluidement, plus uniformément et avec un meilleur contrôle sur la qualité, le séquençage et le résultat final.",
        highlights: [],
        groups: [
          {
            title: "Rénovations intérieures",
            items: [
              "Sous-sols",
              "Salles de bain",
              "Cuisines",
              "Planchers",
              "Charpente",
              "Gypse",
              "Finitions",
              "Isolation",
              "Poutres",
              "Solives",
              "Poteaux",
              "Tuiles",
            ],
          },
          {
            title: "Rénovations extérieures",
            items: [
              "Revêtement extérieur",
              "Terrasses",
              "Travaux de brique",
              "Rampes",
              "Aménagement paysager",
              "Clôtures et barrières",
              "Escaliers",
              "Soffite",
              "Pergolas",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_FR,
        process: SHARED_SERVICE_PROCESS_FR,
        galleryIntro:
          "Un aperçu de chantiers de rénovation en cours, de l'ouverture des espaces intérieurs aux étapes actives de finition.",
        ctaTitle: "Besoin de travaux de rénovation gérés par une seule équipe ?",
        ctaBody:
          "Dites-nous ce qui doit être modernisé, réparé, réaménagé ou reconstruit, et nous pourrons vous orienter vers la bonne portée de travaux.",
        metadata: {
          title: "Services de rénovation | TM Contracting",
          description:
            "Services de rénovation intérieure et extérieure pour sous-sols, salles de bain, cuisines, planchers, charpente, gypse, revêtement, terrasses, brique, rampes et aménagement paysager.",
        },
      },
      concrete: {
        title: "Services de béton (Neuf / Réparation)",
        eyebrow: "Nouveaux coulages + réparation structurale",
        summary:
          "BÉTON NEUF. Nous prenons en charge les projets de béton neuf du début à la fin avec une seule équipe responsable, incluant les dalles, fondations, murs de soutènement, escaliers, patios, allées piétonnes et entrées. Chaque étape est planifiée et exécutée avec une préparation claire, un bon renforcement, un coulage contrôlé, une finition de qualité et une livraison finale durable.",
        description:
          "RÉPARATION ET STABILISATION STRUCTURALE. Pour les problèmes existants de béton et de fondation, nous offrons des solutions ciblées de réparation et de renforcement selon la condition réelle de la structure. Cela comprend le remplissage de fissures, les injections à haute pression, les coutures en fibre de carbone et la sous-oeuvre lorsque un support plus profond est requis. Notre objectif n'est pas seulement de corriger le problème visible, mais de rétablir la stabilité et d'offrir une solution fiable à long terme.",
        scopeTitle: "SOLUTIONS DE BÉTON POUR LES NOUVEAUX TRAVAUX ET LES CONDITIONS EXISTANTES",
        scopeDescription:
          "Les travaux de béton couvrent à la fois les nouvelles installations et les réparations correctives lorsque des surfaces de béton ou des zones de fondation doivent être améliorées, remplacées ou stabilisées. Cela peut inclure l'agrandissement d'un béton existant, la création d'une allée plus propre, l'amélioration d'un trottoir, la modernisation d'une entrée ou le traitement de fissures, de détérioration, d'infiltration d'eau et de mouvements structuraux. En adaptant la portée à la condition réelle du site, les travaux peuvent être exécutés avec une finition plus propre, une meilleure performance et une fiabilité accrue à long terme.",
        highlights: [],
        groups: [
          {
            title: "Travaux de béton neuf",
            items: [
              "Dalles",
              "Fondations",
              "Murs de soutènement",
              "Escaliers et paliers",
              "Patios",
              "Entrées",
              "Trottoirs et allées",
              "Dalles de béton",
              "Planchers de garage",
              "Tabliers d'entrée",
            ],
          },
          {
            title: "Réparation de fissures de fondation",
            items: [
              "Remplissage de fissures",
              "Injections sous pression",
              "Scellement des points de fuite",
              "Réparation intérieure des fissures",
              "Réparation extérieure des fissures",
              "Restauration locale du béton",
              "Planification des réparations selon l'état du site",
              "Traitement des infiltrations d'eau",
              "Solutions de scellement des fissures",
              "Portée de réparation ciblée",
            ],
          },
          {
            title: "Renforcement structural",
            items: [
              "Couture en fibre de carbone",
              "Stabilisation structurale des fissures",
              "Renforcement lorsque requis",
              "Renforcement selon la condition",
              "Renforcement localisé",
              "Support pour béton affaibli",
              "Stabilisation des fissures actives",
              "Réparation liée aux conditions du site",
              "Une seule portée pour réparation et support",
              "Travaux intégrés de stabilisation",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_FR,
        process: SHARED_SERVICE_PROCESS_FR,
        galleryIntro:
          "Travaux de béton sur le terrain, autant pour les nouvelles installations que pour les conditions de réparation structurale autour de propriétés résidentielles existantes.",
        ctaTitle: "Vous planifiez du béton neuf ou vous faites face à un problème structurel dans un béton existant ?",
        ctaBody:
          "Envoyez les détails du site, la zone de béton ou la fondation visée, ainsi que les photos ou dessins disponibles. Nous pourrons définir la bonne portée, qu'il s'agisse de béton neuf, de réparation, de stabilisation, ou d'une combinaison des trois.",
        metadata: {
          title: "Services de béton | TM Contracting",
          description:
            "Services de béton pour dalles, fondations, murs de soutènement, escaliers, patios, trottoirs et entrées, ainsi que remplissage de fissures, injection à haute pression, coutures en fibre de carbone et sous-oeuvre pour la réparation et la stabilisation.",
        },
      },
      "excavation-lifting": {
        title: "Services d'excavation et de levage de maison",
        eyebrow: "Travaux de sol + support structural",
        summary:
          "EXCAVATION ET PRÉPARATION DE SITE. Nous prenons en charge les travaux d'excavation et de préparation de site du début à la fin, y compris les tranchées, le nivellement, le drainage, le remblayage et la préparation pour les fondations et les dalles. Chaque étape est planifiée et exécutée avec une attention soutenue aux conditions du sol, aux exigences structurales et au bon séquençage afin d'assurer une base sûre, efficace et fiable pour les travaux à venir.",
        description:
          "LEVAGE DE MAISON ET SUPPORT STRUCTURAL. Pour les projets impliquant la réparation, le remplacement, le renforcement ou l'approfondissement de fondations, nous fournissons des solutions sécuritaires de levage de maison et de support structural par l'entremise d'une seule équipe coordonnée. Nos services incluent le levage, l'étaiement temporaire, la stabilisation, le redressement et la sous-oeuvre au besoin afin de protéger la structure, garder le contrôle du processus et compléter les travaux avec clarté et responsabilité.",
        scopeTitle: "Services d'excavation et de levage de maison",
        scopeDescription:
          "services d'excavation et d'élévation lorsque les problèmes de fondation ou les conditions structurales ne peuvent pas être traités correctement sans ouvrir le sol et soutenir temporairement le bâtiment",
        highlights: [],
        groups: [
          {
            title: "EXCAVATION & PRÉPARATION DE SITE",
            items: [
              "Tranchées",
              "Nivellement",
              "Drainage",
              "Remblayage",
              "Préparation de site",
              "Excavation pour fondations",
              "Préparation de sous-base pour dalle",
              "Retrait et reprofilage du sol",
              "Préparation des accès",
              "Coordination des travaux de sol",
            ],
          },
          {
            title: "LEVAGE DE MAISON ET SUPPORT",
            items: [
              "Levage sécuritaire de maison",
              "Support structural pendant les travaux de fondation",
              "Étaiement temporaire",
              "Stabilisation",
              "Planification du transfert de charge",
              "Séquence de levage contrôlée",
              "Contreventement structural",
              "Support pour accès aux réparations",
              "Préparation et installation du levage",
              "Maintien structural temporaire",
            ],
          },
          {
            title: "RENFORCEMENT DE FONDATION",
            items: [
              "Redressement",
              "Sous-oeuvre",
              "Renforcement de fondations existantes",
              "Approfondissement de fondations",
              "Stabilisation structurale",
              "Amélioration du support de charge",
              "Renforcement localisé",
              "Correction de l'affaissement",
              "Restauration du support",
              "Renforcement pour travaux de réparation",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_FR,
        process: SHARED_SERVICE_PROCESS_FR,
        galleryIntro:
          "Travaux d'excavation, de préparation de site et de levage sur le terrain, avec fondations exposées, accès machinerie et conditions de support structural.",
        ctaTitle: "Besoin d'excavation, de préparation de site ou de levage de maison lié à des travaux de fondation ?",
        ctaBody:
          "Si le projet implique tranchées, nivellement, drainage, fondations exposées, levage, étaiement ou sous-oeuvre, envoyez-nous les détails du site et les photos disponibles et nous pourrons clarifier la prochaine étape.",
        metadata: {
          title: "Services d'excavation et de levage de maison | TM Contracting",
          description:
            "Services d'excavation et de préparation de site incluant tranchées, nivellement, drainage, remblai et préparation de fondations, ainsi que levage de maison, étaiement, stabilisation, redressement et sous-oeuvre pour les travaux de support structural.",
        },
      },
      "new-construction": {
        title: "Construction neuve et modifications de bâtiment",
        eyebrow: "Construction complète + changements structuraux",
        summary:
          "CONSTRUCTION NEUVE. Nous gérons les projets de construction neuve à partir du sol, y compris les maisons, les garages et les agrandissements, par un seul processus clair et responsable. De la planification et des permis à l'excavation, aux fondations, à la charpente, aux finitions et à la remise finale, chaque étape est organisée pour garder le projet coordonné, efficace et bâti pour durer.",
        description:
          "MODIFICATIONS DE BÂTIMENT. Pour les bâtiments existants, nous réalisons les travaux de modification lorsque des changements à la structure, à la disposition ou au fonctionnement général sont nécessaires. Que le projet implique des ajustements structuraux, des révisions d'aménagement ou l'agrandissement de l'espace existant, les travaux sont pris en charge avec une bonne planification, une exécution disciplinée et une coordination complète sous une seule équipe responsable.",
        scopeTitle: "Services de construction neuve et de modification structurale",
        scopeDescription:
          "Votre projet exige plus qu'un simple travail de construction et demande un processus clair et entièrement pris en charge, de la planification à la livraison finale. Que vous construisiez une nouvelle structure ou que vous modifiiez un bâtiment existant, l'avantage principal est d'avoir une seule équipe responsable pour gérer la portée technique, la coordination, le séquençage et l'exécution sous une direction unique. Cela réduit la confusion, limite les retards, garde les travaux alignés d'une phase à l'autre et vous donne un chemin plus fiable pour les changements structuraux, les agrandissements ou une construction neuve complète.",
        highlights: [],
        groups: [
          {
            title: "Construction neuve",
            items: [
              "Maisons",
              "Garages",
              "Agrandissements",
              "Ajouts",
              "Structures détachées",
              "Travaux de fondation",
              "Charpente structurale",
              "Travaux extérieurs",
              "Construction de nouveaux aménagements",
              "Coordination complète du chantier",
            ],
          },
          {
            title: "Modifications de bâtiment",
            items: [
              "Changements structuraux",
              "Modifications de disposition",
              "Démolition de murs et reconfiguration",
              "Agrandissement des espaces existants",
              "Intégration de zones nouvelles et existantes",
              "Restructuration intérieure",
              "Conversions à aire ouverte",
              "Ajustements de charpente",
              "Amélioration fonctionnelle des espaces",
              "Amélioration de la circulation et des accès",
            ],
          },
        ],
        processIntro: SHARED_SERVICE_PROCESS_INTRO_FR,
        process: SHARED_SERVICE_PROCESS_FR,
        galleryIntro:
          "Conditions de chantier liées à la construction, incluant opérations de site, levage et différentes étapes structurales.",
        ctaTitle: "Vous démarrez une construction neuve ou une modification majeure ?",
        ctaBody:
          "Partagez le type de bâtiment, l'agrandissement ou le changement structural envisagé, et nous pourrons vous orienter vers le bon point de départ pour la portée et la livraison.",
        metadata: {
          title: "Construction neuve et modifications de bâtiment | TM Contracting",
          description:
            "Services de construction neuve et de modification de bâtiment pour maisons, garages, agrandissements, changements structuraux et modifications de disposition, de la planification à la livraison finale.",
        },
      },
    },
  },
}

export function getServicePageEntry(locale: Locale, slug: ServiceSlug) {
  return servicePages[locale].services[slug]
}
