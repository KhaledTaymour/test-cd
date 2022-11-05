import { setCountryNameByLanguage } from "./languageHelper";

describe("setCountryNameByLanguage", () => {
  const l10n = {
    en: "Search",
    de: "Suche",
    ar: "ابحث",
  };
  test("should return English", () => {
    expect(setCountryNameByLanguage("en-US", l10n)).toBe("Search");
  });
  test("should return German", () => {
    expect(setCountryNameByLanguage("de-AT", l10n)).toBe("Suche");
  });
  test("should return Arabic", () => {
    expect(setCountryNameByLanguage("ar-EG", l10n)).toBe("ابحث");
  });
});
