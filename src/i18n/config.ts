import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { loadResource } from "utils/languageHelper";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: {
      order: ["querystring", "navigator"],
      lookupQuerystring: "locale",
    },
    resources: {},
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },
  });

loadResource(i18n);

export default i18n;
