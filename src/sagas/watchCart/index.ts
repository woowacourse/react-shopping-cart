import { watch } from 'node:fs';
import { call, put, takeLatest } from 'redux-saga/effects';

import actions from '../../actions';
import cart, { cartPostActionType } from '../../actions/cart';

// TODO: type 상수화 => 필히 고려
function* watchCart() {
  yield takeLatest(actions.cart.get.request().type, getCart);
  yield takeLatest('cart/post/request', postCart);
}

function* getCart() {
  try {
    // const cart = yield call(Api, args)
    // yield put(acitons.cart.get.success(cart));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

// TODO: action의 타입이 모든 Post action이 아닌 request에 대해서만 대응해야함
function* postCart(action: cartPostActionType) {
  try {
    // const res = yield call(Api, action.payload);
    // yield put(actions.cart.post.success());
  } catch (error) {
    yield put(
      actions.cart.post.failure({ requestErrorMessage: error.message })
    );
  }
}

export default watchCart;
