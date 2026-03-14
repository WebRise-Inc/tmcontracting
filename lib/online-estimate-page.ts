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
        "Book a date and time to speak with TM Contracting online. Select a calendar date, choose a time slot, and submit your contact details.",
    },
    title: "Book a Time to Speak With TM Contracting",
    intro: "Choose an available date, pick a time slot, and send your contact details.",
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
        "Réservez une date et une heure pour parler à TM Contracting en ligne. Sélectionnez une date, choisissez une plage horaire et envoyez vos coordonnées.",
    },
    title: "Réservez un moment pour parler à TM Contracting",
    intro: "Choisissez une date disponible, sélectionnez une plage horaire et envoyez vos coordonnées.",
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
