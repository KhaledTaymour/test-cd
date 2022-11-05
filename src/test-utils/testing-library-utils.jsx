import { render } from "@testing-library/react";
import { AppProvider } from "contexts/context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithContext = (ui, options) => {
  render(ui, { wrapper: AppProvider, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
