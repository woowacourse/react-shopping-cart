import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import ErrorBoundary from "./component/@shared/ErrorBoundary/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/react-shopping-cart">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
