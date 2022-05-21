import { put, call, takeLatest, all } from 'redux-saga/effects';

import {
  fetchProductError,
  fetchProductSuccess,
  fetchProductsError,
  fetchProductsSuccess,
} from 'redux/products/products.action';
import productActionType from 'redux/products/products.types';

import { fetchProduct, fetchProducts } from 'api';

export function* getProducts({ payload: id }) {
  try {
    const data = yield call(fetchProducts, id);
    yield put(fetchProductsSuccess(data));
  } catch (err) {
    yield put(fetchProductsError(err));
  }
}

export function* getProduct({ payload: id }) {
  try {
    const data = yield call(fetchProduct, id);
    yield put(fetchProductSuccess(data));
  } catch (err) {
    yield put(fetchProductError(err));
  }
}

export function* handleFetchProducts() {
  yield takeLatest(productActionType.fetchProductsStart, getProducts);
}

export function* handlefetchProduct() {
  yield takeLatest(productActionType.fetchProductStart, getProduct);
}

export function* productsSaga() {
  yield all([call(handleFetchProducts), call(handlefetchProduct)]);
}
