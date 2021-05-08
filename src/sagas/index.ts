import { all } from "redux-saga/effects";

import watchProducts from "./watchProducts";

function* rootSaga() {
  yield all([watchProducts()]);
}

export default rootSaga;
