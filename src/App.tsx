import React from "react";
import "./App.css";

import { ErrorBoundary } from "react-error-boundary";
import FallbackImage from "components/fallback/Fallback";
import { I18nextProvider } from "react-i18next";
import i18n from "i18n/config";
import Header from "components/header/Header";
import CurrenciesList from "components/currenciesList/CurrenciesList";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={FallbackImage}>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <CurrenciesList />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
