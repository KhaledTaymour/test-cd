import React, { useEffect, useState } from "react";
import CurrencyCard from "components/currencyCard/CurrencyCard";
import "./CurrenciesList.scss";
import { useQueries, useQuery } from "react-query";
import axios from "axios";

type country = {
  flag: string;
  name: { ar: string; de: string; en: string };
};
export type normalizedDataStructure = {
  countries: country[];
  currency: string;
  exchangeRate: { buy: number; sell: number };
  nameI18N: string;
};

const REACT_QUERY_IDS = {
  CURRENCIES: "currencies",
  COUNTRIES: "countries",
} as const;

const APIS = {
  CURRENCIES: "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343",
  COUNTRIES:
    "https://restcountries.com/v3/all?fields=flags,name,currencies,translations",
} as const;

const getCurrencies = async () => {
  const url = APIS.CURRENCIES;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
const getCountries = async () => {
  const url = APIS.COUNTRIES;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

function CurrenciesList() {
  const [normalizedData, setNormalizedData] = useState([]);
  const {
    data: currenciesData,
    isError: currenciesIsError,
    isLoading: currenciesIsLoading,
    // refetch: currenciesRefetch,
  } = useQuery([REACT_QUERY_IDS.CURRENCIES], getCurrencies);

  const {
    data: countriesData,
    isError: countriesIsError,
    isLoading: countriesIsLoading,
    refetch: countriesRefetch,
  } = useQuery([REACT_QUERY_IDS.COUNTRIES], getCountries);

  useEffect(() => {
    if (!currenciesIsLoading && !countriesIsLoading) {
      const data = currenciesData.fx.map((currencyItem: any) => {
        let countries = countriesData.filter(
          (country: any) => country.currencies[currencyItem.currency]
        );
        countries = countries.map((country: any) => ({
          flag: country.flags[0],
          name: {
            en: country.name.common,
            ar: country.translations["ara"].common,
            de: country.translations["deu"].common,
          },
        }));

        if (
          currencyItem.exchangeRate?.buy &&
          currencyItem.exchangeRate?.sell &&
          countries.length
        ) {
          return {
            currency: currencyItem.currency,
            nameI18N: currencyItem.nameI18N,
            exchangeRate: {
              buy: currencyItem.exchangeRate?.buy?.toFixed(2) || 0,
              sell: currencyItem.exchangeRate?.sell.toFixed(2) || 0,
            },
            countries: countries,
          };
        } else {
          return null;
        }
      });
      setNormalizedData(
        data.filter(
          (item: normalizedDataStructure) =>
            item !== null && item.currency !== "EUR"
        )
      );
    }

    return () => {
      setNormalizedData([]);
    };
  }, [currenciesData, countriesData, currenciesIsLoading, countriesIsLoading]);

  return (
    <div className="currencies-list__wrapper">
      CurrenciesList
      {normalizedData.map((item: normalizedDataStructure) => (
        <CurrencyCard key={item.currency} data={item} />
      ))}
    </div>
  );
}

export default CurrenciesList;
