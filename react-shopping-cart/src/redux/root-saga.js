import { all, call } from "redux-saga/effects";
import { productsSaga } from "./products/products.saga";
import { cartsSaga } from "./carts/carts.saga";
export default function* rootSaga() {
  yield all([call(productsSaga), call(cartsSaga)]);
}
