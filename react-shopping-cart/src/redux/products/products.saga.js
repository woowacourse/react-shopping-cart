import { put, call, takeLatest } from "redux-saga/effects";
import { fetchProducts } from "../../api";
import { fetchProductsError, fetchProductsSuccess } from "./products.action";
import productActionType from "./products.types";

export function* getProducts() {
  try {
    const data = yield call(fetchProducts);
    yield put(fetchProductsSuccess(data));
  } catch (err) {
    yield put(fetchProductsError(err));
  }
}

export function* handleFetchProducts() {
  yield takeLatest(productActionType.fetchProductsStart, getProducts);
}

export function* productsSaga() {
  yield call(handleFetchProducts);
}
