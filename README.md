# FX Currencies

This project shows the currencies exchange rate relative to Euro.

## Application Features

- User can see a list of currencies's exchange rate per Euro.
- Each currency is presented in a card having the following info:
  - Currency code
  - Currency name
  - Countries names and flags using this currency
  - its exchange rate
- Can search through the list through a sticky search bar on the top of the page either by
  - Currency code
  - Currency name
  - Country name
- Can change the application language to one of the following:
  - English
  - German
  - Arabic

## Github pages url

[https://khaledtaymour.github.io/fx-currencies/#/](https://khaledtaymour.github.io/fx-currencies/#/)

## To use this app

1.  You can clone it : `git clone git@github.com:KhaledTaymour/fx-currencies.git`\
    or `git clone https://github.com/KhaledTaymour/fx-currencies.git`.
2.  run `npm install`.
3.  run `npm start`.

## Used Tech stack

- react
- Typescript
- react hooks
- react-router
- sass
- react-i18next for I18n & L10n
- axios
- mui
- jest
- react-testing-library
- playwright for e2e testing

## Available Scripts

In the project directory, you can run:

### `npm start`

to start the application

### `npm lint`

to run the linting.

### `npm test`

to run the tests.

### `npm run test:coverage`

to get the tests coverage report.

### `npm run test:e2e`

to run the end-to-end tests via playwright.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

to deploy the app on gh-pages branch.
