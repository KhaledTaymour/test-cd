import React from "react";
import "./CurrencyCard.scss";
import CountryCard from "components/countryCard/CountryCard";
import { useLocalization } from "hooks/useLocalization";
import { normalizedDataStructure } from "utils/types";
import { setCountryNameByLanguage } from "utils/languageHelper";

function CurrencyCard({ data }: { data: normalizedDataStructure }) {
  const { language } = useLocalization();

  return (
    <div className="currency-card__wrapper" data-testid="currency-card">
      <div className="currency-card__info">
        <div className="currency-card__labels">
          <label
            className="currency-card__currency-abbreviation"
            data-testid="currency-card-currency-abbreviation"
          >
            {data.currency}
          </label>
          <label
            className="currency-card__currency-name"
            data-testid="currency-card-currency-name"
          >
            {data.nameI18N}
          </label>
          <div className="currency-card__exchange-rate">
            <p>{`1.00 EUR`}</p>
            <p>{" = "}</p>
            <p data-testid="currency-card-buy-exchange-rate">{`${data.exchangeRate.buy} ${data.currency}`}</p>
          </div>
        </div>
        <div className="currency-card__countries">
          {data.countries.map((country) => (
            <CountryCard
              key={country.name.en}
              name={setCountryNameByLanguage(language, country.name)}
              flag={country.flag}
              flagCode={country.flagCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
