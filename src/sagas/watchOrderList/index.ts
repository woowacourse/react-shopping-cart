import { call, put, takeLatest } from "@redux-saga/core/effects";

import actions from "../../actions";
import { OrderListItemPostRequestActionType, orderListActionType } from "../../actions/orderList";
import api from "../../apis";
import { OrderList } from "../../interface";

function* watchOrderList() {
  yield takeLatest(orderListActionType.get.request, getOrderList);
  yield takeLatest(orderListActionType.item.post.request, postOrder);
}

function* getOrderList() {
  try {
    const orderList: OrderList = yield call(api.orderList.get);

    yield put(actions.orderList.get.success(orderList));
  } catch (error) {
    yield put(actions.orderList.get.failure({ requestErrorMessage: error.message }));
  }
}

function* postOrder(action: OrderListItemPostRequestActionType) {
  try {
    yield call(api.orderList.item.post, action.payload);

    yield put(actions.orderList.item.post.success());
  } catch (error) {
    yield put(
      actions.orderList.item.post.failure({
        requestErrorMessage: error.message,
      })
    );
  }
}

export default watchOrderList;
