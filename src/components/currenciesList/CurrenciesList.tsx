import React from "react";
import CurrencyCard from "components/currencyCard/CurrencyCard";
import "./CurrenciesList.scss";

import { AppContext } from "contexts/context";
import { useLocalization } from "hooks/useLocalization";
import enStrings from "./locale/CurrenciesList.locale.en.json";
import deStrings from "./locale/CurrenciesList.locale.de.json";
import arStrings from "./locale/CurrenciesList.locale.ar.json";
import { normalizedDataStructure } from "utils/types";
import { useCurrencies } from "../../hooks/useCurrencies";

function CurrenciesList() {
  const { t, language } = useLocalization({ enStrings, deStrings, arStrings });

  const { currenciesIsLoading, countriesIsLoading, state } = useCurrencies({
    AppContext,
    language,
  });

  return (
    <div className="currencies-list__wrapper" data-testid="currencies-list">
      {state.filteredData.length ? (
        state.filteredData.map((item: normalizedDataStructure) => (
          <CurrencyCard key={item.currency} data={item} />
        ))
      ) : currenciesIsLoading || countriesIsLoading ? (
        <label data-testid="currencies-list-loading-label">
          <>{t("loading")}</>
        </label>
      ) : (
        <label>
          <>{t("noMatch")}</>
        </label>
      )}
    </div>
  );
}

export default CurrenciesList;
