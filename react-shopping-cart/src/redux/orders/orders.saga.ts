import { put, call, takeLatest, all } from "redux-saga/effects";
import ordersActionTypes from "./orders.types";
import { addOrderItem, deleteOrderItem, fetchOrderItems } from "api";
import { SagaIterator } from "redux-saga";
import { fetchOrdersError, fetchOrdersSuccess } from "./orders.action";
import { Carts } from "type";

export function* getOrderItems(): SagaIterator<void> {
  try {
    const data: Carts = yield call(fetchOrderItems);
    yield put(fetchOrdersSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchOrdersError(err));
    }
  }
}
