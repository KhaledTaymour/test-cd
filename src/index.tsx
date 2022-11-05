import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ErrorBoundary } from "react-error-boundary";
import FallbackImage from "components/fallback/Fallback";
import { I18nextProvider } from "react-i18next";
import i18n from "i18n/config";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "contexts/context";
import { HashRouter } from "react-router-dom";

// import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FallbackImage}>
      <I18nextProvider i18n={i18n}>
        <AppProvider>
          <HashRouter>
            <QueryClientProvider client={queryClient}>
              <App />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </HashRouter>
        </AppProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
