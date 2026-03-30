import type { Locale } from "@/lib/site-copy"

export type FaqItem = {
  question: string
  answer: string
}

export type FaqCategory = {
  title: string
  description: string
  items: FaqItem[]
}

export type FaqPageContent = {
  metadata: {
    title: string
    description: string
  }
  breadcrumbHome: string
  breadcrumbFaq: string
  eyebrow: string
  title: string
  intro: string
  highlights: {
    value: string
    label: string
  }[]
  categoryLabel: string
  categories: FaqCategory[]
  contactTitle: string
  contactBody: string
  primaryCta: string
  secondaryCta: string
}

export const faqPage: Record<Locale, FaqPageContent> = {
  en: {
    metadata: {
      title: "FAQ | TM Contracting",
      description:
        "Sample frequently asked questions about quotes, permits, timelines, project management, warranty coverage, and service areas at TM Contracting.",
    },
    breadcrumbHome: "Home",
    breadcrumbFaq: "FAQ",
    eyebrow: "Sample FAQ",
    title: "Common Questions, Straight Answers",
    intro:
      "This is a starter FAQ page for the site. It covers the questions homeowners usually ask first about scope, timing, warranty, and how projects are managed.",
    highlights: [
      { value: "Fast", label: "Quick answers on planning, quotes, and next steps" },
      { value: "Clear", label: "Straightforward guidance without construction jargon" },
      { value: "Local", label: "Focused on work across Quebec and Ontario" },
    ],
    categoryLabel: "Question Group",
    categories: [
      {
        title: "Quotes & Planning",
        description: "What to expect before the work starts.",
        items: [
          {
            question: "How do I request a quote?",
            answer:
              "You can use the quote form on the site, send project photos, and share the address plus a short description of the work. That gives enough context to start the review and define the next step.",
          },
          {
            question: "Can I get an estimate without an in-person visit?",
            answer:
              "For many projects, yes. A short call or video conversation plus photos can be enough to provide an early estimate or a practical starting range before a site visit is scheduled.",
          },
          {
            question: "Do you help define the scope if I am not fully sure what I need yet?",
            answer:
              "Yes. Early conversations are often about clarifying the problem first, then narrowing the best approach, whether that means renovation, concrete work, excavation, or structural repair.",
          },
        ],
      },
      {
        title: "Project Delivery",
        description: "How work is managed once the job moves forward.",
        items: [
          {
            question: "Do you manage the whole project from start to finish?",
            answer:
              "That is the goal. TM Contracting positions itself as one accountable team handling coordination from planning through execution, so clients are not left managing separate moving parts on their own.",
          },
          {
            question: "Do you only do one trade or can you handle multiple phases?",
            answer:
              "Multiple phases can be handled under one scope. Depending on the project, that can include excavation, concrete, framing, finishes, exterior work, and final delivery.",
          },
          {
            question: "Do you take care of permits and planning?",
            answer:
              "For work that requires planning and permits, those steps can be part of the managed project path. The exact permit requirements depend on the municipality and the type of construction involved.",
          },
        ],
      },
      {
        title: "Warranty & Service Area",
        description: "Basic reassurance questions clients ask most often.",
        items: [
          {
            question: "What does the 3-year risk-free warranty mean?",
            answer:
              "It means TM Contracting stands behind the work it completes. If something related to that work is not right, the expectation is that it gets addressed without argument or deflection.",
          },
          {
            question: "What areas do you serve?",
            answer:
              "The company serves clients across Quebec and Ontario, including the Ottawa-Gatineau region and surrounding areas where the project scope makes sense for the team.",
          },
          {
            question: "Do you handle structural or foundation-related work?",
            answer:
              "Yes. That can include foundation repair, crack repair, house lifting, underpinning, excavation around foundations, and related structural support work depending on the condition on site.",
          },
        ],
      },
    ],
    contactTitle: "Still have a question about your project?",
    contactBody:
      "If the sample FAQ does not cover your situation, the fastest next step is to send photos, the property location, and a short description of what is happening.",
    primaryCta: "Get a Quote",
    secondaryCta: "Contact Us",
  },
  fr: {
    metadata: {
      title: "FAQ | TM Contracting",
      description:
        "Exemple de foire aux questions sur les soumissions, les permis, les délais, la gestion de projet, la garantie et les zones desservies par TM Contracting.",
    },
    breadcrumbHome: "Accueil",
    breadcrumbFaq: "FAQ",
    eyebrow: "FAQ exemple",
    title: "Questions fréquentes, réponses claires",
    intro:
      "Voici une première version de la page FAQ. Elle couvre les questions que les propriétaires posent le plus souvent sur la portée des travaux, les délais, la garantie et la gestion de projet.",
    highlights: [
      { value: "Rapide", label: "Réponses rapides sur la planification, les soumissions et les prochaines étapes" },
      { value: "Clair", label: "Explications simples, sans jargon inutile" },
      { value: "Local", label: "Axé sur les projets au Québec et en Ontario" },
    ],
    categoryLabel: "Groupe de questions",
    categories: [
      {
        title: "Soumissions et planification",
        description: "Ce à quoi s'attendre avant le début des travaux.",
        items: [
          {
            question: "Comment demander une soumission ?",
            answer:
              "Vous pouvez utiliser le formulaire de soumission sur le site, envoyer des photos du projet et partager l'adresse ainsi qu'une courte description des travaux. Cela donne assez de contexte pour amorcer l'analyse et définir la prochaine étape.",
          },
          {
            question: "Puis-je obtenir une estimation sans visite sur place ?",
            answer:
              "Pour plusieurs projets, oui. Un court appel ou une conversation vidéo accompagnée de photos peut suffire pour donner une estimation préliminaire ou une fourchette de départ avant de planifier une visite.",
          },
          {
            question: "Pouvez-vous m'aider à définir la portée si je ne suis pas encore certain de ce qu'il faut faire ?",
            answer:
              "Oui. Les premiers échanges servent souvent à clarifier le problème, puis à déterminer la meilleure approche, qu'il s'agisse de rénovation, de béton, d'excavation ou de réparation structurale.",
          },
        ],
      },
      {
        title: "Déroulement du projet",
        description: "Comment les travaux sont gérés une fois le projet lancé.",
        items: [
          {
            question: "Gérez-vous le projet du début à la fin ?",
            answer:
              "C'est l'objectif. TM Contracting se présente comme une seule équipe responsable de la coordination, de la planification jusqu'à l'exécution, afin que le client n'ait pas à gérer plusieurs intervenants séparément.",
          },
          {
            question: "Faites-vous seulement un métier ou plusieurs phases de travaux ?",
            answer:
              "Plusieurs phases peuvent être regroupées dans une seule portée. Selon le projet, cela peut inclure l'excavation, le béton, la charpente, les finitions, l'extérieur et la livraison finale.",
          },
          {
            question: "Vous occupez-vous des permis et de la planification ?",
            answer:
              "Pour les travaux qui exigent de la planification et des permis, ces étapes peuvent faire partie du parcours géré. Les exigences exactes dépendent de la municipalité et du type de construction visé.",
          },
        ],
      },
      {
        title: "Garantie et territoire desservi",
        description: "Les questions de réassurance les plus fréquentes.",
        items: [
          {
            question: "Que signifie la garantie sans risque de 3 ans ?",
            answer:
              "Cela signifie que TM Contracting assume pleinement le travail réalisé. Si un élément lié à ce travail n'est pas conforme, l'attente est qu'il soit corrigé sans débat ni renvoi de responsabilité.",
          },
          {
            question: "Quelles régions desservez-vous ?",
            answer:
              "L'entreprise sert des clients au Québec et en Ontario, notamment dans la région d'Ottawa-Gatineau et les secteurs environnants lorsque la portée du projet correspond à l'équipe.",
          },
          {
            question: "Prenez-vous en charge les travaux structuraux ou de fondation ?",
            answer:
              "Oui. Cela peut inclure la réparation de fondation, la réparation de fissures, le levage de maison, le sous-oeuvre, l'excavation autour des fondations et les travaux de support structural selon la condition du site.",
          },
        ],
      },
    ],
    contactTitle: "Vous avez encore une question sur votre projet ?",
    contactBody:
      "Si cette FAQ exemple ne couvre pas votre situation, le plus simple est d'envoyer des photos, l'adresse de la propriété et une courte description de ce qui se passe.",
    primaryCta: "Obtenir une soumission",
    secondaryCta: "Nous joindre",
  },
}
