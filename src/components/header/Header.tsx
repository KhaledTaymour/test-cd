import React from "react";
import { useLocalization } from "hooks/useLocalization";
import enStrings from "./locale/Header.locale.en.json";
import deStrings from "./locale/Header.locale.de.json";
import arStrings from "./locale/Header.locale.ar.json";
import SearchBar from "components/searchBar/SearchBar";

function Header() {
  const { t } = useLocalization({
    enStrings,
    deStrings,
    arStrings,
  });

  return (
    <header>
      Header <>{t("title")} </>
      <SearchBar />
    </header>
  );
}

export default Header;
