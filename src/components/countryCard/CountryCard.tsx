import React from "react";
import "./CountryCard.scss";

type Props = {
  name: string;
  flag: any;
};
function CountryCard(props: Props) {
  return (
    <div className="country-card__wrapper">
      <img src={props.flag} alt="flag" />
      <p>{props.name}</p>
    </div>
  );
}

export default CountryCard;
