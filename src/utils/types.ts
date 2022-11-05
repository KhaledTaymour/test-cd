export type availableLanguagesCodes = {
  ar: string;
  de: string;
  en: string;
};

export type country = {
  flag: string;
  flagCode: string;
  name: availableLanguagesCodes;
};
export type normalizedDataStructure = {
  countries: country[];
  currency: string;
  exchangeRate: { buy: number; sell: number };
  nameI18N: string;
};
