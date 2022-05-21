import { put, call, takeLatest, all } from 'redux-saga/effects';

import {
  addProductToCartError,
  addProductToCartSuccess,
  deleteCheckedProductsError,
  deleteCheckedProductsSuccess,
  deleteProductFromCartError,
  deleteProductFromCartSuccess,
  fetchCartsError,
  fetchCartsStart,
  fetchCartsSuccess,
} from 'redux/carts/carts.action';
import cartsActionTypes from 'redux/carts/carts.types';

import { addProductToCart, deleteProductFromCart, fetchCarts } from 'api';

export function* getCarts() {
  try {
    const data = yield call(fetchCarts);
    yield put(fetchCartsSuccess(data));
  } catch (err) {
    yield put(fetchCartsError(err));
  }
}

export function* addProduct({ payload: product }) {
  try {
    yield call(addProductToCart, { ...product, quantity: 1 });
    yield put(addProductToCartSuccess());
  } catch (err) {
    yield put(addProductToCartError(err));
  }
}

export function* deleteProduct({ payload: id }) {
  try {
    yield call(deleteProductFromCart, id);
    yield put(deleteProductFromCartSuccess(id));
  } catch (err) {
    yield put(deleteProductFromCartError(err));
  }
}

export function* deleteCheckedProducts({ payload: checkedIdList }) {
  try {
    yield all(checkedIdList.map((id) => call(deleteProductFromCart, id)));
    yield put(deleteCheckedProductsSuccess());
  } catch (err) {
    yield put(deleteCheckedProductsError(err));
  }
}

export function* handleDeleteProductFromCart() {
  yield takeLatest(cartsActionTypes.deleteProductFromCartStart, deleteProduct);
}

export function* handleAddProductToCart() {
  yield takeLatest(cartsActionTypes.addProductToCartStart, addProduct);
}

export function* handleFetchCarts() {
  yield takeLatest(cartsActionTypes.fetchCartsStart, getCarts);
}

export function* watchHandlingProductAndFetchCarts() {
  yield takeLatest(
    [
      cartsActionTypes.addProductToCartSuccess,
      cartsActionTypes.deleteProductFromCartSuccess,
      cartsActionTypes.deleteCheckedProductsSuccess,
    ],
    function* () {
      yield put(fetchCartsStart());
    }
  );
}

export function* handleDeleteCheckedProducts() {
  yield takeLatest(
    cartsActionTypes.deleteCheckedProductsStart,
    deleteCheckedProducts
  );
}

export function* cartsSaga() {
  yield all([
    call(handleFetchCarts),
    call(handleAddProductToCart),
    call(handleDeleteProductFromCart),
    call(handleDeleteCheckedProducts),
    call(watchHandlingProductAndFetchCarts),
  ]);
}
