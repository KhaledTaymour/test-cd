import { render } from "@testing-library/react";
import CurrencyCard from "./CurrencyCard";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        dir: Function,
        addResourceBundle: (
          lng: string,
          ns: string,
          resources: any,
          deep?: boolean | undefined,
          overwrite?: boolean | undefined
        ) => jest.mocked,
        language: "en-US",
      },
    };
  },
}));

describe("Currency Card", () => {
  const data = {
    currency: "AED",
    nameI18N: "Dirham",
    exchangeRate: {
      buy: 4.07,
      sell: 4.27,
    },
    countries: [
      {
        flag: "https://flagcdn.com/ae.svg",
        flagCode: "AE",
        name: {
          en: "United Arab Emirates",
          ar: "دولة الإمارات العربية المتحدة",
          de: "Vereinigte Arabische Emirate",
        },
      },
    ],
  };
  test("should render the AED currency with correct info", async () => {
    const { getByTestId } = render(<CurrencyCard data={data} />);

    expect(
      getByTestId("currency-card-currency-abbreviation")
    ).toHaveTextContent(/AED/i);
    expect(getByTestId("currency-card-currency-name")).toHaveTextContent(
      /Dirham/i
    );
    expect(getByTestId("currency-card-buy-exchange-rate")).toHaveTextContent(
      /4.07 AED/i
    );
    expect(getByTestId("country-card-country-name")).toHaveTextContent(
      /United Arab Emirates/i
    );
  });
});
