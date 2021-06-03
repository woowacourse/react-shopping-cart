import { call, put, takeLatest } from "@redux-saga/core/effects";

import actions from "../../actions";
import { OrderListItemPostRequestActionType, orderListActionType } from "../../actions/orderList";
import api from "../../apis";
import { Order } from "../../interface";

function* watchOrderList() {
  yield takeLatest(orderListActionType.get.request, getOrderList);
  yield takeLatest(orderListActionType.item.post.request, postOrder);
}

function* getOrderList() {
  const { isSucceeded, message, result } = yield call(api.orderList.get);

  if (isSucceeded) {
    yield put(actions.orderList.get.success(result));
  }  

  yield put(actions.alert.request(message));
}

function* postOrder(action: OrderListItemPostRequestActionType) {
  const { message } = yield call(api.orderList.post, action.payload.id, action.payload.quantity);

  yield put(actions.alert.request(message));
}

export default watchOrderList;
