import { call, put, takeLatest } from '@redux-saga/core/effects';

import actions from '../../actions';
import { orderPostActionType } from '../../actions/order';

function* watchOrder() {
  yield takeLatest('order/post/request', postOrder);
}

function* postOrder(action: orderPostActionType) {
  try {
    // const res = yield call(Api, action.payload);
    //
    yield put(actions.order.post.success());
  } catch (error) {
    yield put(
      actions.order.post.failure({ requestErrorMessage: error.message })
    );
  }
}

export default watchOrder;
