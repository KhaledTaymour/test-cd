import CurrenciesList from "./CurrenciesList";
import { test, expect } from "@playwright/test";

test.describe("Currencies List", () => {
  test("should renders smoothly", async ({ page }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await expect(currenciesList.searchInput).toBeVisible();
    await expect(currenciesList.list).toBeVisible();
    await expect(currenciesList.firstCard).toBeVisible();
    await expect(currenciesList.languageChanger).toBeVisible();
  });
  test("should have its first card having currency code AED", async ({
    page,
  }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await expect(currenciesList.firstCardCurrencyCode).toBeVisible();
    await expect(currenciesList.firstCardCurrencyCode).toHaveText("AED");
  });
  test("should have its first card having country Name United Arab Emirates", async ({
    page,
  }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await expect(currenciesList.firstCardCountryName).toBeVisible();
    await expect(currenciesList.firstCardCountryName).toHaveText(
      "United Arab Emirates"
    );
  });

  test("Language Changer ddl should appear after clicking", async ({
    page,
  }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await expect(currenciesList.languageChanger).toBeVisible();
    await currenciesList.clickOnLanguageChangerDDL();
    await expect(currenciesList.languageChangerDdl).toBeVisible();
  });

  test("Change Language to German changes the labels", async ({ page }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await expect(currenciesList.languageChanger).toBeVisible();
    await currenciesList.clickOnLanguageChangerDDL();
    await currenciesList.changeLanguageToGerman();
    await expect(currenciesList.firstCardCountryName).toHaveText(
      "Vereinigte Arabische Emirate"
    );
    await expect(currenciesList.searchInputLabel).toHaveText("Suche");
  });

  test("Search for United States filters to USD and changes url search param", async ({
    page,
  }) => {
    const currenciesList = new CurrenciesList(page);
    await currenciesList.goto();

    await currenciesList.searchForUnitedStates();
    expect(page.url()).toContain("?search=United+States");
    expect(currenciesList.generalCard).toHaveCount(1);
    await expect(currenciesList.firstCardCountryName).toHaveText("Cambodia");
  });
});
