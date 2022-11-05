import { Locator, Page } from "@playwright/test";

export default class CurrenciesList {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchInputLabel: Locator;
  readonly list: Locator;
  readonly firstCard: Locator;
  readonly generalCard: Locator;
  readonly firstCardCurrencyCode: Locator;
  readonly firstCardCountryName: Locator;
  readonly languageChanger: Locator;
  readonly languageChangerDdl: Locator;
  readonly germanLanguageOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchInputLabel = page.locator('[data-testid="search-input-label"]');
    this.list = page.locator('[data-testid="currencies-list"]');
    this.generalCard = page.locator('[data-testid="currency-card"]');
    this.firstCard = page.locator(
      ':nth-match([data-testid="currency-card"], 1)'
    );
    this.firstCardCurrencyCode = page.locator(
      ':nth-match([data-testid="currency-card"], 1) [data-testid="currency-card-currency-abbreviation"]'
    );
    this.firstCardCountryName = page.locator(
      ':nth-match([data-testid="currency-card"], 1) :nth-match([data-testid="country-card-wrapper"], 1)  [data-testid="country-card-country-name"]'
    );
    this.languageChanger = page.locator('[data-testid="language-changer-ddl"]');
    this.languageChangerDdl = page.locator("role=listbox");
    this.germanLanguageOption = page.locator('role=option[name="German"]');
  }

  async goto() {
    return await Promise.all([
      this.page.goto("http://localhost:3000/#/"),
      this.page.waitForSelector('[data-testid="search-input"]', {
        state: "visible",
      }),
      this.page.waitForSelector('[data-testid="currencies-list"]', {
        state: "visible",
      }),
      this.page.waitForSelector(
        ':nth-match([data-testid="currency-card"], 1)',
        { state: "visible" }
      ),
      this.page.waitForSelector('[data-testid="language-changer-ddl"]', {
        state: "visible",
      }),
    ]);
  }

  async clickOnLanguageChangerDDL() {
    return await Promise.all([
      this.page.click('[data-testid="language-changer-ddl"]'),
      this.page.waitForSelector("role=listbox"),
    ]);
  }

  async changeLanguageToGerman() {
    return await Promise.all([this.page.click('role=option[name="German"]')]);
  }

  async searchForUnitedStates() {
    return await Promise.all([
      await this.searchInput.type("United States"),
      await this.page.waitForNavigation({
        url: "http://localhost:3000/#/?search=United+States",
      }),
    ]);
  }
}
