import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import App from "@/App";
import reducer from "@/redux/reducer";
import "@/style.scss";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "{}");

const initialState = {
  productList: [],
  cart: cartFromLocalStorage,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
