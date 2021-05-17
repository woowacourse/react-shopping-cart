import { all } from "redux-saga/effects";

import watchCart from "./watchCart";
import watchOrderList from "./watchOrderList";
import watchProducts from "./watchProducts";

function* rootSaga() {
  yield all([watchProducts(), watchCart(), watchOrderList()]);
}

export default rootSaga;
