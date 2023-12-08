import i18next from "i18next"

import enTranslations from "./i18n/en.json"
import deTranslations from "./i18n/de.json"
import esTranslations from "./i18n/es.json"
import ptTranslations from "./i18n/pt.json"
import itTranslations from "./i18n/it.json"
import frTranslations from "./i18n/fr.json"

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
