import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import LanguageChanger from "./LanguageChanger";

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

describe("Language Changer Dropdown", () => {
  test("should have 3 languages options: English, German, and Arabic", async () => {
    const { getByRole } = render(<LanguageChanger />);
    userEvent.click(getByRole("button"));

    const items = screen.getAllByRole("option");

    expect(items.length).toBe(3);
    for (let i = 0; i < items.length; i++) {
      if (i === 0) expect(items[i]).toHaveTextContent("en");
      else if (i === 1) expect(items[i]).toHaveTextContent("de");
      else expect(items[i]).toHaveTextContent("ar");
    }
  });

  test("should change header to English when choosing English item", async () => {
    const { getByRole } = render(<LanguageChanger />);
    userEvent.click(getByRole("button"));

    const listbox = within(getByRole("listbox"));
    userEvent.click(listbox.getByText(/en/i));

    setTimeout(() => {
      expect(getByRole("heading")).toHaveTextContent(/english/i);
    }, 100);
  });
});
