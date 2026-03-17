import type { Locale } from "@/lib/site-copy"

type EstimatePageContent = {
  metadata: {
    title: string
    description: string
  }
  title: string
  intro: string
  booking: {
    availableDates: string
    preferredTime: string
    timeSlots: string[]
    chooseDate: string
    chooseTime: string
    timezoneNote: string
    fullName: string
    phone: string
    email: string
    submitIdle: string
    submitLoading: string
    successTitle: string
    successBody: string
    reset: string
    missingDate: string
    missingTime: string
    unavailableDate: string
    selectedDate: string
    selectedTime: string
    previousMonth: string
    nextMonth: string
  }
  emails: {
    subjectPrefix: string
    heading: string
    fullName: string
    phone: string
    email: string
    date: string
    time: string
  }
}

export const onlineEstimatePage: Record<Locale, EstimatePageContent> = {
  en: {
    metadata: {
      title: "Online Estimate | TM Contracting",
      description:
        "Book a time with TM Contracting using the online appointment calendar.",
    },
    title: "Book a Time to Speak With TM Contracting",
    intro: "Use the online booking calendar below to choose the appointment time that works best for you.",
    booking: {
      availableDates: "Available Dates",
      preferredTime: "Preferred Time",
      timeSlots: ["9:00 AM", "11:00 AM", "1:30 PM", "4:00 PM", "6:30 PM"],
      chooseDate: "Choose a date to see time slots.",
      chooseTime: "Choose one time slot.",
      timezoneNote: "All times shown are Eastern Time.",
      fullName: "Full name",
      phone: "Phone number",
      email: "Email address",
      submitIdle: "Book Appointment",
      submitLoading: "Booking Appointment",
      successTitle: "Your appointment request has been sent.",
      successBody: "TM Contracting received your selected date and time and will confirm the booking with you directly.",
      reset: "Book another appointment",
      missingDate: "Please choose a date.",
      missingTime: "Please choose a time slot.",
      unavailableDate: "Unavailable",
      selectedDate: "Selected date",
      selectedTime: "Selected time",
      previousMonth: "Previous month",
      nextMonth: "Next month",
    },
    emails: {
      subjectPrefix: "Online appointment booking",
      heading: "New online appointment request",
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      date: "Selected date",
      time: "Selected time",
    },
  },
  fr: {
    metadata: {
      title: "Estimation en ligne | TM Contracting",
      description:
        "Réservez un moment avec TM Contracting à l'aide du calendrier de rendez-vous en ligne.",
    },
    title: "Réservez un moment pour parler à TM Contracting",
    intro: "Utilisez le calendrier de réservation ci-dessous pour choisir le moment qui vous convient.",
    booking: {
      availableDates: "Dates disponibles",
      preferredTime: "Heure souhaitée",
      timeSlots: ["9 h 00", "11 h 00", "13 h 30", "16 h 00", "18 h 30"],
      chooseDate: "Choisissez une date pour voir les plages horaires.",
      chooseTime: "Choisissez une plage horaire.",
      timezoneNote: "Toutes les heures affichées sont en heure de l'Est.",
      fullName: "Nom complet",
      phone: "Numéro de téléphone",
      email: "Adresse courriel",
      submitIdle: "Réserver le rendez-vous",
      submitLoading: "Réservation en cours",
      successTitle: "Votre demande de rendez-vous a été envoyée.",
      successBody: "TM Contracting a bien reçu la date et l'heure choisies et confirmera le rendez-vous avec vous directement.",
      reset: "Réserver un autre rendez-vous",
      missingDate: "Veuillez choisir une date.",
      missingTime: "Veuillez choisir une plage horaire.",
      unavailableDate: "Indisponible",
      selectedDate: "Date choisie",
      selectedTime: "Heure choisie",
      previousMonth: "Mois précédent",
      nextMonth: "Mois suivant",
    },
    emails: {
      subjectPrefix: "Réservation rendez-vous en ligne",
      heading: "Nouvelle demande de rendez-vous en ligne",
      fullName: "Nom complet",
      phone: "Téléphone",
      email: "Courriel",
      date: "Date choisie",
      time: "Heure choisie",
    },
  },
}
