import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { applyMiddleware, createStore } from "redux";
import reducer from "./modules/products";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createThunkMiddleware from "./lib/thunk";
import ThemeProvider from "./ThemeProvider";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createThunkMiddleware()))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
