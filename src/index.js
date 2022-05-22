import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createThunkMiddleware from "./lib/thunk";
import ThemeProvider from "./ThemeProvider";
import appReducer from "./modules";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");

  worker.start({
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });
}

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(createThunkMiddleware()))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
