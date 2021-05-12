import { put, call, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { productsActionType } from "../../actions/products";
import api from "../../apis";
import { ProductsObject } from "../../interface";

function* watchProducts() {
  yield takeLatest(productsActionType.get.request, getProducts);
}

function* getProducts() {
  try {
    const products: ProductsObject = yield call(api.products.get);

    yield put(actions.products.get.success(products));
  } catch (error) {
    yield put(actions.products.get.failure({ requestErrorMessage: error.message }));
  }
}

export default watchProducts;
