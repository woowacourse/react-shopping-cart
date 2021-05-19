import { put, call, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { productsActionType } from "../../actions/products";
import api from "../../apis";

function* watchProducts() {
  yield takeLatest(productsActionType.get.request, getProducts);
}

function* getProducts() {
  const { isSucceeded, message, result } = yield call(api.products.get);

  if (isSucceeded) {
    yield put(actions.products.get.success(result));
  }
}

export default watchProducts;
