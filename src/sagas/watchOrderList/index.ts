import { put, takeLatest } from '@redux-saga/core/effects';

import actions from '../../actions';
import { orderListItemPostActionType } from '../../actions/orderList';

function* watchOrderList() {
  yield takeLatest('orderList/get/request', getOrderList);
  yield takeLatest('orderList/item/post/request', postOrder);
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

function* postOrder(action: orderListItemPostActionType) {
  try {
    // const res = yield call(Api, action.payload);
    //
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
