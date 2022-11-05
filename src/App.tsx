import React from "react";
import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "components/header/Header";
import CurrenciesList from "components/currenciesList/CurrenciesList";
import { useLocalization } from "hooks/useLocalization";

function App() {
  const { dir } = useLocalization({});

  return (
    <div className={`App${dir === "rtl" ? " rtl" : ""}`}>
      <Header />
      <CurrenciesList />
    </div>
  );
}

export default App;
