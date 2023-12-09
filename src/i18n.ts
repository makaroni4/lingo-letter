import i18next from "i18next"

import enUITranslations from "./i18n/ui/en.json"
import deUITranslations from "./i18n/ui/de.json"
import esUITranslations from "./i18n/ui/es.json"
import ptUITranslations from "./i18n/ui/pt.json"
import itUITranslations from "./i18n/ui/it.json"
import frUITranslations from "./i18n/ui/fr.json"

import enExamsTranslations from "./i18n/exams/en.json"
import deExamsTranslations from "./i18n/exams/de.json"
import esExamsTranslations from "./i18n/exams/es.json"
import ptExamsTranslations from "./i18n/exams/pt.json"
import itExamsTranslations from "./i18n/exams/it.json"
import frExamsTranslations from "./i18n/exams/fr.json"

const enTranslations = {
  translation: {
    ...enUITranslations.translation,
    ...enExamsTranslations.translation
  }
}
const deTranslations = {
  translation: {
    ...deUITranslations.translation,
    ...deExamsTranslations.translation
  }
}
const esTranslations = {
  translation: {
    ...esUITranslations.translation,
    ...esExamsTranslations.translation
  }
}
const ptTranslations = {
  translation: {
    ...ptUITranslations.translation,
    ...ptExamsTranslations.translation
  }
}
const itTranslations = {
  translation: {
    ...itUITranslations.translation,
    ...itExamsTranslations.translation
  }
}
const frTranslations = {
  translation: {
    ...frUITranslations.translation,
    ...frExamsTranslations.translation
  }
}

i18next.init({
  fallbackLng: "en",
  debug: true,
  resources: {
    en: enTranslations,
    de: deTranslations,
    es: esTranslations,
    pt: ptTranslations,
    it: itTranslations,
    fr: frTranslations
  }
})

export default i18next
