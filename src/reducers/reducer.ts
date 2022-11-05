import { country, normalizedDataStructure } from "utils/types";

export enum reducerActionType {
  initialSet,
  filter,
  reset,
}

export const initialState: {
  data: normalizedDataStructure[];
  filteredData: normalizedDataStructure[];
} = {
  data: [],
  filteredData: [],
};

export type reducerInitialStateAction = {
  type: reducerActionType.initialSet;
  payload: normalizedDataStructure[];
};
export type reducerFilterStateAction = {
  type: reducerActionType.filter;
  payload: { filter: string; language: string };
};
export type reducerResetAction = {
  type: reducerActionType.reset;
};

export const reducer = (
  state: {
    data: normalizedDataStructure[];
    filteredData: normalizedDataStructure[];
  },
  action:
    | reducerInitialStateAction
    | reducerFilterStateAction
    | reducerResetAction
) => {
  switch (action.type) {
    case reducerActionType.initialSet:
      return {
        ...state,
        data: [...action.payload],
        filteredData: [...action.payload],
      };
    case reducerActionType.filter: {
      const isMatchingCurrencyCode = (
        data: normalizedDataStructure,
        name: string
      ) => data.currency.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      const isMatchingCurrencyName = (
        data: normalizedDataStructure,
        name: string
      ) => data.nameI18N.toLocaleLowerCase().includes(name.toLocaleLowerCase());
      const isMatchingCountryName = (
        data: normalizedDataStructure,
        name: string,
        language: string
      ) => {
        const languageCode = language.includes("de")
          ? "de"
          : language.includes("ar")
          ? "ar"
          : "en";
        return data.countries.some((c: country) =>
          c.name[languageCode]
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase())
        );
      };

      return {
        ...state,
        filteredData: [...state.data].filter(
          (cur) =>
            isMatchingCurrencyCode(cur, action.payload.filter) ||
            isMatchingCurrencyName(cur, action.payload.filter) ||
            isMatchingCountryName(
              cur,
              action.payload.filter,
              action.payload.language
            )
        ),
      };
    }
    case reducerActionType.reset:
      return {
        ...state,
        filteredData: state.data,
      };
    default:
      return state;
  }
};
