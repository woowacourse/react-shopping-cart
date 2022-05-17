import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store, persistor } from "redux/store";

import "./index.css";
import App from "./App";
import ErrorBoundary from "component/Wrapper/ErrorBoundary/ErrorBoundary";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename="/react-shopping-cart">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary fallback={<div>에러입니다.</div>}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
