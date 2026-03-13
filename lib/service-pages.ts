import type { Locale } from "@/lib/site-copy"

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
  renovation: 12,
  concrete: 10,
  "excavation-lifting": 10,
  "new-construction": 4,
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug)
}

export function getServiceGalleryPaths(slug: ServiceSlug) {
  return Array.from({ length: galleryCounts[slug] }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0")
    return `/images/service-galleries/${slug}/${imageNumber}.jpeg`
  })
}

export const servicePages: Record<Locale, ServicePageLocale> = {
  en: {
    chrome: {
      breadcrumbHome: "Home",
      breadcrumbServices: "Services",
      heroLabel: "TM Contracting Service",
      scopeTitle: "What This Service Covers",
      processTitle: "How The Work Moves",
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
          "Interior and exterior renovation work handled start to finish by one accountable crew.",
        description:
          "We take renovation projects from demolition and framing through drywall, finishing, and exterior completion so you are not coordinating separate trades on your own. Whether the scope is inside, outside, or both, one team keeps the sequence, workmanship, and final delivery aligned.",
        highlights: [
          { value: "Interior", label: "Basements, bathrooms, kitchens, flooring, framing, drywall, finishing" },
          { value: "Exterior", label: "Siding, decks, brick work, ramps, landscaping" },
          { value: "One Team", label: "Single crew managing the job from opening to final hand-off" },
        ],
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
            ],
          },
          {
            title: "Delivery model",
            items: [
              "Start-to-finish coordination by one team",
              "Scope sequencing without subcontractor confusion",
              "Consistent finishing from rough work to close-out",
            ],
          },
        ],
        processIntro:
          "Renovation work succeeds when the sequence is controlled. We structure the site, move through the build cleanly, and finish with the same team that started the work.",
        process: [
          {
            title: "Review the space",
            body: "We walk through the existing conditions, confirm priorities, and map the renovation scope so the work starts with a clear plan.",
          },
          {
            title: "Open and prepare",
            body: "Demolition, framing adjustments, and rough preparation are handled in the right order to keep the project moving cleanly.",
          },
          {
            title: "Build and finish",
            body: "Core construction, drywall, flooring, trim, exterior work, and detail finishing are completed as one coordinated sequence.",
          },
          {
            title: "Deliver ready",
            body: "Final refinements, site cleanup, and hand-off happen with the same accountability that carried the project from day one.",
          },
        ],
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
        title: "Concrete Services",
        eyebrow: "New pours + structural repair",
        summary:
          "Concrete work covering new pours and foundation crack repair, including reinforcement when structural support is needed.",
        description:
          "We handle new concrete installations such as slabs, foundations, retaining walls, stairs, patios, and driveways, while also addressing existing foundation issues with crack filling, pressure injections, and carbon-fiber stitching where reinforcement is required. The result is one crew that can build new concrete or stabilize existing structures without splitting responsibility.",
        highlights: [
          { value: "New Pours", label: "Slabs, foundations, retaining walls, stairs, patios, driveways" },
          { value: "Crack Repair", label: "Crack filling and pressure injection for active issues" },
          { value: "Reinforcement", label: "Carbon-fiber stitching when structural support is needed" },
        ],
        groups: [
          {
            title: "New concrete work",
            items: [
              "Slabs",
              "Foundations",
              "Retaining walls",
              "Stairs",
              "Patios",
              "Driveways",
            ],
          },
          {
            title: "Foundation crack repair",
            items: [
              "Crack filling",
              "Pressure injections",
              "Localized repair planning",
            ],
          },
          {
            title: "Structural reinforcement",
            items: [
              "Carbon-fiber stitching",
              "Repair strategy tied to foundation condition",
              "One scope for both repair and stabilization",
            ],
          },
        ],
        processIntro:
          "Concrete work demands strong prep and clear repair logic. We keep the site organized from forming and pours through targeted structural repair work.",
        process: [
          {
            title: "Assess and lay out",
            body: "We review the site, existing foundation condition, or new installation scope and set the right approach before concrete work begins.",
          },
          {
            title: "Form or expose",
            body: "For new pours we prepare forms and base conditions. For repairs we expose the affected areas and confirm the crack or structural issue.",
          },
          {
            title: "Pour or repair",
            body: "We complete the pour or carry out crack filling and pressure injections based on the work required at that location.",
          },
          {
            title: "Reinforce where needed",
            body: "When the condition calls for it, carbon-fiber stitching and related reinforcement steps are added to strengthen the structure.",
          },
        ],
        galleryIntro:
          "Concrete work on site, from active pours to installation conditions around residential properties.",
        ctaTitle: "Planning new concrete or dealing with foundation cracks?",
        ctaBody:
          "Send the location, the surface or foundation involved, and any photos you have. We can help determine whether the scope is a new pour, a repair, or both.",
        metadata: {
          title: "Concrete Services | TM Contracting",
          description:
            "Concrete services including slabs, foundations, retaining walls, stairs, patios, driveways, crack filling, pressure injections, and carbon-fiber stitching.",
        },
      },
      "excavation-lifting": {
        title: "Excavation & House Lifting Services",
        eyebrow: "Groundwork + structural support",
        summary:
          "Excavation, drainage, and foundation-prep work combined with safe house lifting and structural support for foundation repair or replacement.",
        description:
          "We handle trenching, grading, drainage, backfill, and site preparation for foundations and slabs, then support more complex structural work with house lifting, temporary shoring, stabilization, re-leveling, and underpinning. That lets one team manage both the ground conditions and the structural support strategy when a foundation needs to be repaired, replaced, strengthened, or deepened.",
        highlights: [
          { value: "Site Prep", label: "Trenching, grading, drainage, backfill, and slab or foundation preparation" },
          { value: "House Lifting", label: "Safe lifting and support for foundation repair or replacement" },
          { value: "Foundation Support", label: "Shoring, stabilization, re-leveling, and underpinning" },
        ],
        groups: [
          {
            title: "Excavation scope",
            items: [
              "Trenching",
              "Grading",
              "Drainage",
              "Backfill",
              "Site preparation for foundations and slabs",
            ],
          },
          {
            title: "House lifting and support",
            items: [
              "Safe house lifting",
              "Structural support during foundation work",
              "Temporary shoring",
              "Stabilization",
            ],
          },
          {
            title: "Foundation strengthening",
            items: [
              "Re-leveling",
              "Underpinning",
              "Strengthening existing foundations",
              "Deepening existing foundations",
            ],
          },
        ],
        processIntro:
          "This work depends on site control and structural sequencing. We move carefully from excavation and exposure into lifting, support, and final stabilization.",
        process: [
          {
            title: "Prepare the site",
            body: "We establish access, protect the structure, and organize trenching, grading, drainage, or backfill requirements around the foundation area.",
          },
          {
            title: "Excavate and expose",
            body: "The foundation or slab area is opened safely so the structural condition and required repair or replacement path are fully accessible.",
          },
          {
            title: "Lift and support",
            body: "Where necessary, we carry out house lifting, temporary shoring, and stabilization to protect the structure while the foundation work proceeds.",
          },
          {
            title: "Re-level and strengthen",
            body: "Final stabilization can include re-leveling and underpinning to strengthen or deepen the existing foundation before close-out.",
          },
        ],
        galleryIntro:
          "Excavation and lifting work in the field, showing exposed foundations, machine access, and structural support conditions.",
        ctaTitle: "Need excavation or foundation support work on an active structure?",
        ctaBody:
          "If the job involves drainage, trenching, settlement, exposed footings, or lifting for repair or replacement, send the site details and we can help frame the next step.",
        metadata: {
          title: "Excavation & House Lifting Services | TM Contracting",
          description:
            "Excavation, grading, drainage, backfill, house lifting, shoring, stabilization, re-leveling, and underpinning for foundation repair, replacement, or strengthening.",
        },
      },
      "new-construction": {
        title: "New Construction & Building Modifications",
        eyebrow: "Ground-up builds + structural changes",
        summary:
          "Homes, garages, extensions, and structural layout modifications managed from planning and permits through final delivery.",
        description:
          "We build new homes, garages, and extensions, and we also handle building modifications that change structure, layout, or flow. The work is managed across planning, permits, excavation, foundation, framing, exterior scope, interior finishes, and final completion so the entire build path stays tied to one accountable team.",
        highlights: [
          { value: "New Builds", label: "Homes, garages, and extensions" },
          { value: "Modifications", label: "Structural changes and layout revisions to existing buildings" },
          { value: "Full Delivery", label: "Planning, permits, excavation, framing, finishes, and final hand-off" },
        ],
        groups: [
          {
            title: "New construction scope",
            items: [
              "Homes",
              "Garages",
              "Extensions",
            ],
          },
          {
            title: "Building modifications",
            items: [
              "Structural changes",
              "Layout modifications",
              "Integrated work across existing and new areas",
            ],
          },
          {
            title: "Managed phases",
            items: [
              "Planning and permits",
              "Excavation and foundation",
              "Framing and exterior work",
              "Interior finishes and final delivery",
            ],
          },
        ],
        processIntro:
          "Ground-up work and structural modifications need a disciplined path from paper to site. We keep each phase tied together so the build moves forward without disconnect between planning and execution.",
        process: [
          {
            title: "Plan and permit",
            body: "We define the project scope, align the build sequence, and move through the planning and permit stage before physical work starts.",
          },
          {
            title: "Break ground",
            body: "Excavation and foundation work establish the base conditions for the build, extension, or structural modification.",
          },
          {
            title: "Frame and close in",
            body: "Framing and exterior construction shape the structure while keeping the shell and build path on schedule.",
          },
          {
            title: "Finish and deliver",
            body: "Interior work, final adjustments, and completion are carried through to hand-off as part of one managed scope.",
          },
        ],
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
          "Des rénovations intérieures et extérieures prises en charge du début à la fin par une seule équipe responsable.",
        description:
          "Nous réalisons les projets de rénovation depuis l'ouverture du chantier et la charpente jusqu'au gypse, aux finitions et aux travaux extérieurs, sans vous laisser coordonner plusieurs équipes séparées. Que la portée soit à l'intérieur, à l'extérieur, ou les deux, une seule équipe garde le rythme, la qualité d'exécution et la livraison finale alignés.",
        highlights: [
          { value: "Intérieur", label: "Sous-sols, salles de bain, cuisines, planchers, charpente, gypse, finitions" },
          { value: "Extérieur", label: "Revêtement, terrasses, maçonnerie de brique, rampes, aménagement paysager" },
          { value: "Une équipe", label: "Un seul équipage responsable du début du chantier à la remise finale" },
        ],
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
            ],
          },
          {
            title: "Mode de livraison",
            items: [
              "Coordination complète par une seule équipe",
              "Séquençage clair sans confusion entre sous-traitants",
              "Finition cohérente du gros oeuvre jusqu'à la remise du projet",
            ],
          },
        ],
        processIntro:
          "La rénovation fonctionne quand la séquence de travail est maîtrisée. Nous structurons le chantier, avançons proprement dans l'exécution et terminons avec la même équipe que celle qui a démarré le projet.",
        process: [
          {
            title: "Analyser l'espace",
            body: "Nous passons en revue les conditions existantes, confirmons les priorités et définissons la portée pour démarrer avec un plan clair.",
          },
          {
            title: "Ouvrir et préparer",
            body: "Démolition, ajustements de charpente et préparation brute sont exécutés dans le bon ordre pour garder l'élan du projet.",
          },
          {
            title: "Construire et finir",
            body: "Construction principale, gypse, planchers, moulures, travaux extérieurs et finitions sont réalisés comme une seule séquence coordonnée.",
          },
          {
            title: "Livrer prêt",
            body: "Les derniers ajustements, le nettoyage du chantier et la remise finale sont faits avec la même responsabilité qu'au premier jour.",
          },
        ],
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
        title: "Services de béton",
        eyebrow: "Nouveaux coulages + réparation structurale",
        summary:
          "Travaux de béton pour nouveaux coulages et réparation de fissures de fondation, avec renforcement structural lorsque nécessaire.",
        description:
          "Nous réalisons de nouvelles installations de béton comme les dalles, fondations, murs de soutènement, escaliers, patios et entrées, tout en réparant les problèmes existants de fondation avec le remplissage de fissures, les injections sous pression et la couture au carbone lorsque le renforcement est requis. Le résultat : une seule équipe capable de construire du neuf ou de stabiliser l'existant sans diviser les responsabilités.",
        highlights: [
          { value: "Nouveau béton", label: "Dalles, fondations, murs de soutènement, escaliers, patios, entrées" },
          { value: "Réparation", label: "Remplissage de fissures et injections sous pression selon la condition" },
          { value: "Renfort", label: "Couture en fibre de carbone lorsque le support structural est requis" },
        ],
        groups: [
          {
            title: "Travaux de béton neuf",
            items: [
              "Dalles",
              "Fondations",
              "Murs de soutènement",
              "Escaliers",
              "Patios",
              "Entrées",
            ],
          },
          {
            title: "Réparation de fissures",
            items: [
              "Remplissage de fissures",
              "Injections sous pression",
              "Plan de réparation ciblé",
            ],
          },
          {
            title: "Renforcement structural",
            items: [
              "Couture en fibre de carbone",
              "Stratégie adaptée à l'état de la fondation",
              "Une seule portée pour réparer et stabiliser",
            ],
          },
        ],
        processIntro:
          "Les travaux de béton demandent une préparation solide et une logique de réparation claire. Nous gardons le chantier structuré du coffrage jusqu'aux interventions de renforcement ciblées.",
        process: [
          {
            title: "Évaluer et implanter",
            body: "Nous analysons le site, l'état de la fondation existante ou la portée du nouveau béton avant de définir l'approche.",
          },
          {
            title: "Coffrer ou dégager",
            body: "Pour le neuf, nous préparons les formes et la base. Pour la réparation, nous ouvrons les zones touchées et confirmons la condition réelle.",
          },
          {
            title: "Couler ou réparer",
            body: "Nous effectuons le coulage ou les réparations par remplissage et injection selon ce que la situation exige.",
          },
          {
            title: "Renforcer si requis",
            body: "Lorsque la condition le demande, nous ajoutons la couture en fibre de carbone et les étapes de support nécessaires pour renforcer la structure.",
          },
        ],
        galleryIntro:
          "Travaux de béton sur le terrain, de l'installation active jusqu'aux conditions de chantier autour des propriétés résidentielles.",
        ctaTitle: "Vous prévoyez du béton neuf ou vous gérez des fissures de fondation ?",
        ctaBody:
          "Envoyez l'emplacement, la surface ou la fondation en cause, ainsi que des photos si vous en avez. Nous pourrons déterminer s'il s'agit d'un nouveau coulage, d'une réparation, ou des deux.",
        metadata: {
          title: "Services de béton | TM Contracting",
          description:
            "Services de béton incluant dalles, fondations, murs de soutènement, escaliers, patios, entrées, remplissage de fissures, injections sous pression et couture en fibre de carbone.",
        },
      },
      "excavation-lifting": {
        title: "Services d'excavation et de levage de maison",
        eyebrow: "Travaux de sol + support structural",
        summary:
          "Excavation, drainage et préparation de fondation combinés à un levage de maison sécuritaire et à un support structural pour réparer ou remplacer une fondation.",
        description:
          "Nous prenons en charge les tranchées, le nivellement, le drainage, le remblai et la préparation du site pour les fondations et dalles, puis nous soutenons les interventions plus complexes avec le levage de maison, l'étaiement temporaire, la stabilisation, le redressement et le sous-oeuvre. Une seule équipe peut ainsi gérer à la fois les conditions de sol et la stratégie de support structural lorsqu'une fondation doit être réparée, remplacée, renforcée ou approfondie.",
        highlights: [
          { value: "Préparation", label: "Tranchées, nivellement, drainage, remblai et préparation de fondations ou dalles" },
          { value: "Levage", label: "Levage sécuritaire et support structural pendant les travaux de fondation" },
          { value: "Renforcement", label: "Étaiement, stabilisation, redressement et sous-oeuvre" },
        ],
        groups: [
          {
            title: "Portée d'excavation",
            items: [
              "Tranchées",
              "Nivellement",
              "Drainage",
              "Remblai",
              "Préparation de site pour fondations et dalles",
            ],
          },
          {
            title: "Levage et support",
            items: [
              "Levage sécuritaire de maison",
              "Support structural pendant les travaux",
              "Étaiement temporaire",
              "Stabilisation",
            ],
          },
          {
            title: "Renforcement de fondation",
            items: [
              "Redressement",
              "Sous-oeuvre",
              "Renforcement de fondations existantes",
              "Approfondissement de fondations existantes",
            ],
          },
        ],
        processIntro:
          "Ce type de travail repose sur le contrôle du site et une séquence structurale rigoureuse. Nous avançons avec méthode, de l'excavation jusqu'au support et à la stabilisation finale.",
        process: [
          {
            title: "Préparer le site",
            body: "Nous organisons l'accès, protégeons la structure et cadrons les besoins en tranchées, nivellement, drainage ou remblai autour de la zone de fondation.",
          },
          {
            title: "Excaver et dégager",
            body: "La zone de fondation ou de dalle est ouverte de façon sécuritaire afin de rendre la condition structurale entièrement accessible.",
          },
          {
            title: "Lever et soutenir",
            body: "Lorsque requis, nous effectuons le levage de maison, l'étaiement temporaire et la stabilisation pour protéger la structure pendant l'intervention.",
          },
          {
            title: "Redresser et renforcer",
            body: "La stabilisation finale peut inclure le redressement et le sous-oeuvre afin de renforcer ou d'approfondir la fondation existante avant la fermeture du chantier.",
          },
        ],
        galleryIntro:
          "Travaux d'excavation et de levage sur le terrain, avec fondations exposées, accès machinerie et conditions de support structural.",
        ctaTitle: "Besoin d'excavation ou de support de fondation sur une structure existante ?",
        ctaBody:
          "Si le chantier implique drainage, tranchées, affaissement, semelles exposées ou levage pour réparation ou remplacement, envoyez-nous les détails du site et nous pourrons cadrer la prochaine étape.",
        metadata: {
          title: "Services d'excavation et de levage de maison | TM Contracting",
          description:
            "Services d'excavation, nivellement, drainage, remblai, levage de maison, étaiement, stabilisation, redressement et sous-oeuvre pour la réparation, le remplacement ou le renforcement de fondations.",
        },
      },
      "new-construction": {
        title: "Construction neuve et modifications de bâtiment",
        eyebrow: "Construction complète + changements structuraux",
        summary:
          "Maisons, garages, agrandissements et modifications structurales gérés de la planification jusqu'à la livraison finale.",
        description:
          "Nous construisons des maisons, garages et agrandissements, et nous réalisons aussi les modifications de bâtiment qui changent la structure, la disposition ou le fonctionnement des espaces. Le travail est géré à travers la planification, les permis, l'excavation, la fondation, la charpente, l'enveloppe extérieure, les finitions intérieures et la complétion finale, afin qu'une seule équipe demeure responsable de l'ensemble du parcours.",
        highlights: [
          { value: "Neuf", label: "Maisons, garages et agrandissements" },
          { value: "Modification", label: "Changements structuraux et ajustements de configuration intérieure" },
          { value: "Livraison", label: "Planification, permis, excavation, charpente, finitions et remise finale" },
        ],
        groups: [
          {
            title: "Portée de construction neuve",
            items: [
              "Maisons",
              "Garages",
              "Agrandissements",
            ],
          },
          {
            title: "Modifications de bâtiment",
            items: [
              "Changements structuraux",
              "Modifications de disposition",
              "Intégration entre existant et nouveau",
            ],
          },
          {
            title: "Phases gérées",
            items: [
              "Planification et permis",
              "Excavation et fondation",
              "Charpente et travaux extérieurs",
              "Finitions intérieures et livraison finale",
            ],
          },
        ],
        processIntro:
          "Les projets de construction neuve et de modification majeure demandent un cheminement discipliné du papier jusqu'au chantier. Nous gardons chaque phase attachée à une même logique d'exécution.",
        process: [
          {
            title: "Planifier et obtenir les permis",
            body: "Nous définissons la portée, alignons la séquence de construction et faisons avancer la planification ainsi que les permis avant le début physique des travaux.",
          },
          {
            title: "Ouvrir le chantier",
            body: "L'excavation et les fondations établissent les conditions de base du bâtiment neuf, de l'agrandissement ou de la modification structurale.",
          },
          {
            title: "Charpenter et fermer l'enveloppe",
            body: "La charpente et les travaux extérieurs donnent forme à la structure tout en gardant l'avancement du chantier cohérent.",
          },
          {
            title: "Finaliser et livrer",
            body: "Les travaux intérieurs, les ajustements finaux et la complétion sont menés jusqu'à la remise dans le cadre d'une seule portée gérée.",
          },
        ],
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
