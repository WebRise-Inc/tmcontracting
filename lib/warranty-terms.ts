import type { Locale } from "@/lib/site-copy"

export type WarrantySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  closingParagraphs?: string[]
}

export type WarrantyTermsContent = {
  metadata: {
    title: string
    description: string
  }
  eyebrow: string
  companyName: string
  title: string
  introduction: string
  warrantyLabel: string
  warrantyValue: string
  warrantyNote: string
  contentsLabel: string
  sections: WarrantySection[]
  closingName: string
  backToTop: string
}

export const warrantyTerms: Record<Locale, WarrantyTermsContent> = {
  en: {
    metadata: {
      title: "Warranty Terms & Conditions | TM Contracting",
      description:
        "Review TM Contracting's three-year limited workmanship warranty, coverage conditions, exclusions, and claims procedure.",
    },
    eyebrow: "Client warranty document",
    companyName: "TMCONTRC (CANADA INC.) as TM Contracting",
    title: "Warranty Terms & Conditions",
    introduction:
      "The following terms define the scope, conditions, and limitations of the warranty provided for work completed by TM Contracting.",
    warrantyLabel: "Limited workmanship warranty",
    warrantyValue: "3 years",
    warrantyNote: "From the date of substantial completion",
    contentsLabel: "In this document",
    sections: [
      {
        title: "Warranty period",
        paragraphs: [
          "Subject to the terms, conditions, limitations, exclusions, and obligations set forth herein, TM Contracting provides a limited warranty for a period of three (3) years commencing on the date of substantial completion of the Work. This warranty applies solely to defects resulting directly from defective workmanship performed by TM Contracting within the scope of the contracted Work.",
        ],
      },
      {
        title: "Scope of warranty",
        paragraphs: [
          "This warranty is limited exclusively to the specific Work described in the approved quotation, contract, invoice, approved change orders, and related project documentation issued by TM Contracting.",
          "Where a warrantable defect is established, TM Contracting shall have the sole and exclusive right, at its discretion, to repair, replace, modify, or otherwise remedy the defective portion of the Work. The selection of the corrective measure shall remain solely within TM Contracting’s discretion.",
          "This warranty does not guarantee perfection, aesthetic preference, or performance exceeding normal industry standards applicable to the Work.",
        ],
      },
      {
        title: "Conditions of warranty coverage",
        paragraphs: [
          "The warranty provided by TM Contracting is conditional upon the Work being performed in accordance with TM Contracting’s quality standards, specifications, materials, methods, and recommendations.",
          "Where a client requests, approves, or elects any reduction, substitution, omission, or deviation from TM Contracting’s recommendations, TM Contracting may limit, exclude, or deny warranty coverage for that portion of the Work.",
          "Any deviation must be confirmed in writing to maintain warranty eligibility.",
        ],
      },
      {
        title: "Materials and third-party products",
        paragraphs: [
          "Materials or products supplied by the client or by any third party not formally approved in writing by TM Contracting are not covered.",
          "TM Contracting shall not be liable for defects in client-supplied materials or third-party products unless explicitly agreed upon.",
          "Manufacturer warranties, where applicable, remain the responsibility of the client.",
        ],
      },
      {
        title: "Project documentation and evidence",
        paragraphs: [
          "Upon completion, TM Contracting may document the Work through photographs, videos, and inspection reports. These records may be used as evidence in any warranty claim.",
        ],
      },
      {
        title: "Unauthorized modifications and interventions",
        paragraphs: [
          "Any modification, repair, or alteration to the completed Work by anyone other than TM Contracting, without prior written authorization, shall void the warranty for the affected portion.",
        ],
      },
      {
        title: "Client maintenance obligations",
        paragraphs: [
          "The client must follow all maintenance instructions provided by TM Contracting. The use of unapproved chemicals, salts, or improper maintenance will void the warranty.",
        ],
      },
      {
        title: "Exclusions",
        paragraphs: [
          "The warranty does not cover normal wear and tear, environmental factors, unauthorized alterations, or third-party actions outside TM Contracting’s control.",
        ],
      },
      {
        title: "Warranty claim procedure",
        paragraphs: [
          "Claims must be submitted in writing within the warranty period, including client name, property address, a description of the defect, photos (if applicable), and when the issue was discovered.",
          "TM Contracting must be allowed to inspect the reported issue before any corrective action.",
        ],
      },
      {
        title: "Inspection and remedy",
        paragraphs: [
          "TM Contracting reserves the right to inspect and determine if a defect is covered. The client must prove the defect results from TM Contracting’s workmanship.",
          "No reimbursement is provided for unauthorized third-party repairs.",
        ],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "TM Contracting’s maximum liability shall not exceed the original contract value of the specific work.",
          "TM Contracting shall not be liable for indirect or consequential damages, including loss of use or income.",
        ],
      },
      {
        title: "Transferability",
        paragraphs: [
          "The warranty applies only to the original client and is not transferable without TM Contracting’s written consent.",
        ],
      },
      {
        title: "Governing law",
        paragraphs: [
          "These terms shall be governed by the laws of the province where the project is completed and the federal laws of Canada. Any dispute shall be submitted to the competent courts of that province unless otherwise required by law.",
        ],
      },
    ],
    closingName: "TM CONTRC (CANADA INC.) as TM Contracting",
    backToTop: "Back to top",
  },
  fr: {
    metadata: {
      title: "Conditions générales de garantie | TM Contracting",
      description:
        "Consultez la garantie limitée de trois ans de TM Contracting, ses conditions d’admissibilité, ses exclusions et la procédure de réclamation.",
    },
    eyebrow: "Document de garantie client",
    companyName: "TM CONTRC (CANADA INC.) sous le nom de TM Contracting",
    title: "Conditions générales de garantie",
    introduction:
      "Les conditions suivantes définissent la portée, les modalités et les limites de la garantie offerte pour les travaux réalisés par TM Contracting.",
    warrantyLabel: "Garantie limitée sur l’exécution",
    warrantyValue: "3 ans",
    warrantyNote: "À compter de l’achèvement substantiel",
    contentsLabel: "Dans ce document",
    sections: [
      {
        title: "Période de garantie",
        paragraphs: [
          "Sous réserve des présentes modalités, conditions, limitations, exclusions et obligations, TM Contracting offre une garantie limitée d'une durée de trois (3) ans à compter de la date de l'achèvement substantiel des Travaux. Cette garantie s'applique uniquement aux défauts résultant directement d'une mauvaise exécution des travaux réalisés par TM Contracting dans le cadre du mandat contractuel.",
        ],
      },
      {
        title: "Portée de la garantie",
        paragraphs: [
          "La présente garantie est strictement limitée aux Travaux décrits dans la soumission approuvée, le contrat, la facture, les avenants approuvés ainsi que tout document de projet émis par TM Contracting.",
          "Lorsqu'un défaut couvert par la garantie est constaté, TM Contracting se réserve le droit exclusif, à son entière discrétion, de réparer, remplacer, modifier ou corriger la portion concernée des Travaux. Le choix de la mesure corrective appartient exclusivement à TM Contracting.",
          "La présente garantie ne constitue pas une garantie de perfection, de préférence esthétique ou de performance excédant les normes reconnues de l'industrie applicables aux Travaux.",
        ],
      },
      {
        title: "Conditions d'admissibilité à la garantie",
        paragraphs: [
          "La présente garantie est conditionnelle au fait que les Travaux soient exécutés conformément aux normes de qualité, spécifications, matériaux, méthodes et recommandations établis par TM Contracting.",
          "Lorsqu'un client demande, accepte ou choisit une réduction, une substitution, une omission, une modification ou une dérogation aux recommandations de TM Contracting, celui-ci se réserve le droit de limiter, exclure ou refuser la couverture de garantie relativement à la portion concernée des Travaux.",
          "Toute dérogation aux recommandations de TM Contracting doit être approuvée par écrit afin de maintenir l'admissibilité à la garantie.",
        ],
      },
      {
        title: "Matériaux fournis par le client et produits de tiers",
        paragraphs: [
          "Les matériaux, équipements ou produits fournis par le client ou par un tiers qui n'ont pas été approuvés officiellement par écrit par TM Contracting ne sont pas couverts par la présente garantie.",
          "TM Contracting ne pourra être tenu responsable des défauts, défaillances, incompatibilités ou performances insuffisantes résultant de matériaux ou produits fournis par le client ou par tout fournisseur, entrepreneur ou tiers.",
          "Les garanties offertes par les fabricants demeurent la responsabilité du client lorsque applicables.",
        ],
      },
      {
        title: "Documentation et preuve des travaux",
        paragraphs: [
          "À la fin des Travaux, TM Contracting peut documenter les lieux et les ouvrages réalisés au moyen de photographies, vidéos, rapports d'inspection ou autres documents pertinents.",
          "Ces documents pourront être utilisés comme éléments de preuve dans le cadre de toute réclamation de garantie, enquête, expertise ou procédure judiciaire.",
        ],
      },
      {
        title: "Modifications ou interventions non autorisées",
        paragraphs: [
          "Toute modification, réparation, altération, ajout, retrait ou intervention effectuée sur les Travaux après leur réalisation par une personne autre que TM Contracting, sans autorisation écrite préalable de TM Contracting, entraînera automatiquement l'annulation de la garantie applicable à la portion concernée des Travaux.",
          "Aucune autorisation verbale ne sera reconnue. Seule une autorisation écrite émise par l'administration de TM Contracting sera considérée valide.",
        ],
      },
      {
        title: "Obligations d'entretien du client",
        paragraphs: [
          "Le client est tenu de respecter toutes les recommandations d'entretien fournies par TM Contracting ainsi que les exigences des fabricants lorsque celles-ci s'appliquent.",
          "L'utilisation de produits, matériaux, produits chimiques, sels de déglaçage ou méthodes d'entretien non recommandés ou incompatibles avec les Travaux réalisés peut entraîner l'annulation totale ou partielle de la garantie.",
          "Dans le cas de surfaces de béton, l'utilisation de sels non adaptés au béton, de produits chimiques agressifs ou de produits susceptibles d'endommager la surface annulera automatiquement la garantie applicable aux zones affectées.",
        ],
      },
      {
        title: "Exclusions",
        paragraphs: ["La présente garantie ne couvre pas :"],
        bullets: [
          "L'usure normale ;",
          "Le vieillissement normal des matériaux ;",
          "Les dommages résultant d'un mauvais usage, d'une négligence ou d'un entretien inadéquat ;",
          "Les dommages causés par des tiers ;",
          "Les modifications non autorisées ;",
          "Les conditions environnementales hors du contrôle raisonnable de TM Contracting ;",
          "Les mouvements de sol, le gel, les infiltrations d'eau, les conditions souterraines ou les phénomènes naturels ;",
          "Les catastrophes naturelles, incendies, inondations, tempêtes ou événements de force majeure ;",
          "Les défauts résultant de matériaux fournis par le client ou par des tiers.",
        ],
      },
      {
        title: "Procédure de réclamation",
        paragraphs: [
          "Toute réclamation de garantie doit être soumise par écrit avant l'expiration de la période de garantie.",
          "La réclamation doit inclure :",
        ],
        bullets: [
          "Le nom du client ;",
          "L'adresse du projet ;",
          "Une description détaillée du problème signalé ;",
          "Des photographies, lorsque disponibles ;",
          "La date à laquelle le problème a été constaté.",
        ],
        closingParagraphs: [
          "TM Contracting devra avoir un accès raisonnable afin d'inspecter les Travaux avant toute intervention corrective.",
        ],
      },
      {
        title: "Inspection et correction",
        paragraphs: [
          "TM Contracting se réserve le droit d'inspecter les Travaux afin de déterminer si le problème signalé est couvert par la présente garantie.",
          "Le client devra démontrer que le défaut résulte directement des travaux exécutés par TM Contracting.",
          "Aucun remboursement ne sera accordé pour des réparations effectuées par un tiers sans l'autorisation écrite préalable de TM Contracting.",
        ],
      },
      {
        title: "Limitation de responsabilité",
        paragraphs: [
          "La responsabilité maximale de TM Contracting en vertu de la présente garantie est limitée à la valeur initiale des Travaux faisant l'objet de la réclamation.",
          "TM Contracting ne pourra être tenu responsable des dommages indirects, consécutifs, accessoires ou économiques, incluant notamment la perte d'usage, la perte de revenus, les frais d'hébergement temporaire ou toute autre perte similaire.",
        ],
      },
      {
        title: "Cessibilité",
        paragraphs: [
          "La présente garantie est accordée exclusivement au client original et ne peut être transférée à un propriétaire subséquent sans l'autorisation écrite de TM Contracting.",
        ],
      },
      {
        title: "Loi applicable",
        paragraphs: [
          "Les présentes Conditions Générales de Garantie sont régies par les lois de la province dans laquelle le projet a été exécuté ainsi que par les lois fédérales applicables du Canada.",
          "Tout différend découlant de la présente garantie sera soumis aux tribunaux compétents de la province où les Travaux ont été réalisés, sauf disposition contraire prévue par la loi.",
        ],
      },
    ],
    closingName: "TM CONTRC (CANADA INC.) faisant affaire sous le nom de TM Contracting",
    backToTop: "Retour en haut",
  },
}
