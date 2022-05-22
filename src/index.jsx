import ReactDOM from "react-dom/client";

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import reducer from "@/redux/reducer";

import "@/style.scss";

export const initialState = {
  productList: {
    loading: false,
    data: null,
    error: null,
  },
};

const store = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
