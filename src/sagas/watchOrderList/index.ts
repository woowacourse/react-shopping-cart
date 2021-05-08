import { call, put, takeLatest } from "@redux-saga/core/effects";

import actions from "../../actions";

function* watchOrderList() {
  yield takeLatest("orderList/get/request", getOrderList);
}

function* getOrderList() {
  try {
    // const orderList = yield call(Api);
    // yield put(actions.orderList.get.success(orderList));
  } catch (error) {
    yield put(
      actions.orderList.get.failure({ requestErrorMessage: error.message })
    );
  }
}

export default watchOrderList;
