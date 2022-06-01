import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import App from "@/App";
import reducer from "@redux/reducer";
import "./index.css";
import "@scss/style";

function prepareMSW() {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require
    const { worker } = require("../mock/browser");
    return worker.start();
  }
  return Promise.resolve();
}

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "{}");

const initialState = {
  productList: [], // 화면에 그리는 용도
  productObjs: {}, // 상품 정보 검색용
  cart: cartFromLocalStorage, // 장바구니에 담긴 상품 리스트
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

prepareMSW().then(() => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
