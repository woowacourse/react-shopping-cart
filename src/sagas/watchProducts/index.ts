import { put, call, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { productsActionType } from "../../actions/products";
import api from "../../apis";
import { Product } from "../../types";

function* watchProducts() {
  yield takeLatest(productsActionType.get.request, getProducts);
}

function* getProducts() {
  try {
    const products: Product[] = yield call(api.products.get);

    yield put(actions.products.get.success(products));
  } catch (error) {
    yield put(actions.products.get.failure({ requestErrorMessage: error.message }));
  }
}

export default watchProducts;
