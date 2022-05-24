import { put, call, takeLatest, all } from "redux-saga/effects";
import ordersActionTypes from "./orders.types";
import { addOrderItem, deleteOrderItem, fetchOrderItems } from "api";
import { SagaIterator } from "redux-saga";
import {
  addOrderError,
  addOrderStart,
  addOrderSuccess,
  deleteOrderError,
  deleteOrderStart,
  deleteOrderSuccess,
  fetchOrdersError,
  fetchOrdersSuccess,
} from "./orders.action";
import { CartItem } from "type";

export function* getOrderItems(): SagaIterator<void> {
  try {
    const data: CartItem[] = yield call(fetchOrderItems);
    yield put(fetchOrdersSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchOrdersError(err));
    }
  }
}

export function* addOrderItems({
  payload,
}: ReturnType<typeof addOrderStart>): SagaIterator<void> {
  try {
    yield all(payload.map((cart) => call(addOrderItem, cart)));
    yield put(addOrderSuccess(payload));
  } catch (err) {
    if (err instanceof Error) {
      yield put(addOrderError(err));
    }
  }
}

export function* deleteOrderItems({
  payload,
}: ReturnType<typeof deleteOrderStart>): SagaIterator<void> {
  try {
    console.log(payload);
    yield all(payload.map((id) => call(deleteOrderItem, id)));
    yield put(deleteOrderSuccess());
  } catch (err) {
    if (err instanceof Error) {
      yield put(deleteOrderError(err));
    }
  }
}

export function* handleFetchOrders() {
  yield takeLatest(ordersActionTypes.fetchOrdersStart, getOrderItems);
}

export function* handleAddOrders() {
  yield takeLatest(ordersActionTypes.addOrderStart, addOrderItems);
}

export function* handleDeleteOrders() {
  yield takeLatest(ordersActionTypes.deleteOrderStart, deleteOrderItems);
}

export function* orderSaga() {
  yield all([
    call(handleFetchOrders),
    call(handleAddOrders),
    call(handleDeleteOrders),
  ]);
}
