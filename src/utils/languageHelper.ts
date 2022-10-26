import { i18n } from "i18next";
import config from "i18n/i18n.config.json";

export function loadResource(
  i18n: i18n,
  {
    enStrings,
    deStrings,
    arStrings,
  }: {
    enStrings?: { [key: string]: string };
    arStrings?: { [key: string]: string };
    deStrings?: { [key: string]: string };
  } = {}
) {
  if (config.english && enStrings) {
    config.english.forEach((lang) => {
      i18n.addResourceBundle(lang, "common", enStrings);
    });
  }

  if (config.german && deStrings) {
    config.german.forEach((lang) => {
      i18n.addResourceBundle(lang, "common", deStrings);
    });
  }

  if (config.arabic && arStrings) {
    config.arabic.forEach((lang) => {
      i18n.addResourceBundle(lang, "common", arStrings);
    });
  }
}
