import { all } from "redux-saga/effects";
import watchAlert from "./watchAlert";

import watchCart from "./watchCart";
import watchOrderList from "./watchOrderList";
import watchProducts from "./watchProducts";

function* rootSaga() {
  yield all([
    watchProducts(),
    watchCart(),
    watchOrderList(),
    watchAlert()
  ]);
}

export default rootSaga;
