import React from "react";
import "./CurrencyCard.scss";
import CountryCard from "components/countryCard/CountryCard";
import SwitzerlandFlag from "assets/flags/ch.png";
import LiechtensteinFlag from "assets/flags/li.png";
import NoFlag from "assets/flags/no-flag.png";
import { normalizedDataStructure } from "components/currenciesList/CurrenciesList";

function CurrencyCard({ data }: { data: normalizedDataStructure }) {
  return (
    <div className="currency-card__wrapper">
      <div className="currency-card__info">
        <div className="currency-card__labels">
          <label className="currency-card__currency-abbreviation">
            {data.currency}
          </label>
          <label className="currency-card__currency-name">
            {data.nameI18N}
          </label>
          <div className="currency-card__exchange-rate">
            <p>{`1.00 EUR`}</p>
            <p>{" = "}</p>
            <p>{`${data.exchangeRate.buy} ${data.currency}`}</p>
          </div>
        </div>
        <div className="currency-card__countries">
          {data.countries.map((country) => (
            <CountryCard
              key={country.name.en}
              name={country.name.en}
              flag={country.flag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyCard;
