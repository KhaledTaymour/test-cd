import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SearchBar from "components/searchBar/SearchBar";
import { HashRouter } from "react-router-dom";

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
      },
    };
  },
}));

describe("Search Input", () => {
  test("should be able to type in", async () => {
    render(
      <HashRouter>
        <SearchBar />
      </HashRouter>
    );

    const searchInput = screen.getByTestId("search-input");
    userEvent.clear(searchInput);
    userEvent.type(searchInput, "Fiji");
    setTimeout(() => {
      expect(searchInput).toHaveTextContent("Fiji");
    }, 1000);
  });
});
