import { useTranslation } from "react-i18next";
import { loadResource } from "utils/languageHelper";
import { useEffect, useState } from "react";

type Props = {
  enStrings?: { [key: string]: string };
  arStrings?: { [key: string]: string };
  deStrings?: { [key: string]: string };
};
export const useLocalization = ({
  enStrings,
  arStrings,
  deStrings,
}: Props = {}) => {
  const { t, i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadResource(i18n, { enStrings, arStrings, deStrings });
      setIsLoaded(true);
    }
  }, [isLoaded, i18n, enStrings, arStrings, deStrings]);

  return {
    t,
    isLoaded,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    dir: i18n.dir(),
    isLtr: i18n.dir() === "ltr" ? true : false,
  };
};
