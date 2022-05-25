import { put, call, takeLatest, all } from "redux-saga/effects";
import { fetchDetailProduct, fetchProducts } from "api";
import {
  fetchProductDetailError,
  fetchProductDetailStart,
  fetchProductDetailSucccess,
  fetchProductsError,
  fetchProductsStart,
  fetchProductsSuccess,
} from "redux/products/products.action";
import productActionType from "redux/products/products.types";
import { SagaIterator } from "redux-saga";

export function* getProducts({
  payload: id,
}: ReturnType<typeof fetchProductsStart>): SagaIterator<void> {
  try {
    const data = yield call(fetchProducts, id);
    yield put(fetchProductsSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchProductsError(err));
    }
  }
}

export function* getDetailProduct({
  payload: id,
}: ReturnType<typeof fetchProductDetailStart>): SagaIterator<void> {
  try {
    const data = yield call(fetchDetailProduct, id);
    yield put(fetchProductDetailSucccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchProductDetailError(err));
    }
  }
}

export function* handleFetchProducts() {
  yield takeLatest(productActionType.fetchProductsStart, getProducts);
}

export function* handleFetchDetailProduct() {
  yield takeLatest(productActionType.fetchProductDetailStart, getDetailProduct);
}

export function* productsSaga() {
  yield all([call(handleFetchProducts), call(handleFetchDetailProduct)]);
}
