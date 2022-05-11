import { put, call, takeLatest, all } from "redux-saga/effects";
import cartsActionTypes from "./carts.types";
import { addProductToCart, deleteProductFromCart, fetchCarts } from "../../api";
import {
  addProductToCartError,
  addProductToCartSuccess,
  deleteProductToCartError,
  deleteProductToCartSuccess,
  fetchCartsError,
  fetchCartsSuccess,
} from "./carts.action";

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
    const data = yield call(addProductToCart, product);
    yield put(addProductToCartSuccess(data));
  } catch (err) {
    yield put(addProductToCartError(err));
  }
}

export function* deleteProduct({ payload: id }) {
  try {
    yield call(deleteProductFromCart, id);
    yield put(deleteProductToCartSuccess(id));
  } catch (err) {
    yield put(deleteProductToCartError(err));
  }
}

export function* handleDeleteProduct() {
  yield takeLatest(cartsActionTypes.deleteProductToCartStart, deleteProduct);
}

export function* handleAddProduct() {
  yield takeLatest(cartsActionTypes.addProductToCartStart, addProduct);
}

export function* handleFetchCarts() {
  yield takeLatest(cartsActionTypes.fetchCartsStart, getCarts);
}

export function* cartsSaga() {
  yield all([
    call(handleFetchCarts),
    call(handleAddProduct),
    call(handleDeleteProduct),
  ]);
}
