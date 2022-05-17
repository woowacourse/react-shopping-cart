import { put, call, takeLatest, all } from "redux-saga/effects";
import cartsActionTypes from "redux/carts/carts.types";
import { addProductToCart, deleteProductFromCart, fetchCarts } from "api";
import {
  addProductToCartError,
  addProductToCartStart,
  addProductToCartSuccess,
  deleteCheckedProductsError,
  deleteCheckedProductsStart,
  deleteCheckedProductsSuccess,
  deleteProductToCartError,
  deleteProductToCartStart,
  deleteProductToCartSuccess,
  fetchCartsError,
  fetchCartsSuccess,
} from "redux/carts/carts.action";
import { CartItem, Carts } from "type";
import { SagaIterator } from "redux-saga";

export function* getCarts(): SagaIterator<void> {
  try {
    const data: Carts = yield call(fetchCarts);
    yield put(fetchCartsSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchCartsError(err));
    }
  }
}

export function* addProduct({
  payload: product,
}: ReturnType<typeof addProductToCartStart>): SagaIterator<void> {
  try {
    const data: CartItem = yield call(addProductToCart, product);
    yield put(addProductToCartSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(addProductToCartError(err));
    }
  }
}

export function* deleteProduct({
  payload: id,
}: ReturnType<typeof deleteProductToCartStart>): SagaIterator<void> {
  try {
    yield call(deleteProductFromCart, id);
    yield put(deleteProductToCartSuccess(id));
  } catch (err) {
    if (err instanceof Error) {
      yield put(deleteProductToCartError(err));
    }
  }
}

export function* deleteCheckedProducts({
  payload: checkedIdList,
}: ReturnType<typeof deleteCheckedProductsStart>): SagaIterator<void> {
  try {
    yield all(
      checkedIdList.map((id: string) => call(deleteProductFromCart, id))
    );
    yield put(deleteCheckedProductsSuccess(checkedIdList));
  } catch (err) {
    if (err instanceof Error) {
      yield put(deleteCheckedProductsError(err));
    }
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

export function* handleDeleteCheckedProducts() {
  yield takeLatest(
    cartsActionTypes.deleteCheckedProductsStart,
    deleteCheckedProducts
  );
}

export function* cartsSaga() {
  yield all([
    call(handleFetchCarts),
    call(handleAddProduct),
    call(handleDeleteProduct),
    call(handleDeleteCheckedProducts),
  ]);
}
