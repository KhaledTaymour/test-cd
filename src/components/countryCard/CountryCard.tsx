import React from "react";
import { getLocalFlag } from "utils/flagsLoader";
import "./CountryCard.scss";

type Props = {
  name: string;
  flag: string;
  flagCode: string;
};
function CountryCard(props: Props) {
  return (
    <div className="country-card__wrapper" data-testid="country-card-wrapper">
      <img src={getLocalFlag(props.flagCode, props.flag)} alt="flag" />
      <p data-testid="country-card-country-name">{props.name}</p>
    </div>
  );
}

export default CountryCard;
