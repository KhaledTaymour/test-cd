import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { reducerActionType } from "reducers/reducer";
import { useSearchParams } from "react-router-dom";
import { normalizedDataStructure } from "utils/types";

const REACT_QUERY_IDS = {
  CURRENCIES: "currencies",
  COUNTRIES: "countries",
} as const;

const APIS = {
  CURRENCIES: "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343",
  COUNTRIES:
    "https://restcountries.com/v3/all?fields=flags,name,altSpellings,currencies,translations",
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

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AppContext: React.Context<any>;
  language: string;
};
export function useCurrencies({ AppContext, language }: Props) {
  const { state, dispatch } = useContext(AppContext);

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
    // refetch: countriesRefetch,
  } = useQuery([REACT_QUERY_IDS.COUNTRIES], getCountries);

  useEffect(() => {
    if (!currenciesIsLoading && !countriesIsLoading) {
      const alternativeCurrencyNames: { [key: string]: string } = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = currenciesData.fx.map((currencyItem: any) => {
        let countries = countriesData
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((country: any) => country.currencies[currencyItem.currency])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .sort((a: any, b: any) =>
            a.name[language.substring(0, 2)] > b.name[language.substring(0, 2)]
              ? 1
              : -1
          );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        countries = countries.map((country: any) => {
          for (const cur in country.currencies) {
            if (!alternativeCurrencyNames[cur])
              alternativeCurrencyNames[cur] = country.currencies[cur].name;
          }
          return {
            flag: country.flags[0],
            flagCode: country.altSpellings[0],
            name: {
              en: country.name.common,
              ar: country.translations["ara"].common,
              de: country.translations["deu"].common,
            },
          };
        });

        if (
          currencyItem.exchangeRate?.buy &&
          currencyItem.exchangeRate?.sell &&
          countries.length
        ) {
          return {
            currency: currencyItem.currency,
            nameI18N:
              currencyItem.nameI18N ||
              alternativeCurrencyNames[currencyItem.currency] ||
              "",
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

      dispatch({
        type: reducerActionType.initialSet,
        payload: data
          .filter((item: normalizedDataStructure) => item !== null)
          .sort((a: normalizedDataStructure, b: normalizedDataStructure) =>
            a.currency > b.currency ? 1 : -1
          ),
      });
    }
  }, [
    currenciesData,
    countriesData,
    currenciesIsLoading,
    countriesIsLoading,
    dispatch,
    language,
  ]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParamsValue = searchParams.get("search");
    if (searchParamsValue) {
      dispatch({
        type: reducerActionType.filter,
        payload: { filter: searchParamsValue, language },
      });
    } else {
      dispatch({
        type: reducerActionType.reset,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    currenciesIsLoading,
    currenciesIsError,
    countriesIsLoading,
    countriesIsError,
    state,
  };
}
