import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import GlobalStyle from "./Global.styled";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
