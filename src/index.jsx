import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import reducer from "./redux/reducer";
import "./style.scss";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? { cart: {} };

const store = createStore(reducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
