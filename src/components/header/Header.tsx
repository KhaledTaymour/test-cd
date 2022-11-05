import React from "react";
import "./Header.scss";
import { useLocalization } from "hooks/useLocalization";
import enStrings from "./locale/Header.locale.en.json";
import deStrings from "./locale/Header.locale.de.json";
import arStrings from "./locale/Header.locale.ar.json";
import SearchBar from "components/searchBar/SearchBar";
import LanguageChanger from "components/languageChanger/LanguageChanger";

function Header() {
  const { t } = useLocalization({
    enStrings,
    deStrings,
    arStrings,
  });

  return (
    <header className="header__wrapper">
      <label className="header__label">
        <>{t("title")} </>
        <LanguageChanger />
      </label>
      <SearchBar />
    </header>
  );
}

export default Header;
