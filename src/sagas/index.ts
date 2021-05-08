import { all } from "redux-saga/effects";

import watchCart from "./watchCart";
import watchOrder from "./watchOrder";
import watchOrderList from "./watchOrderList";
import watchProducts from "./watchProducts";

function* rootSaga() {
  yield all([watchProducts(), watchCart(), watchOrder(), watchOrderList()]);
}

export default rootSaga;
