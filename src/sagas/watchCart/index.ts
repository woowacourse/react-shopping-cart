import { all, call, put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { cartActionType, CartDeleteRequestActionType, CartPostRequestActionType } from "../../actions/cart";
import api from "../../apis";
import { ERROR_MESSAGE } from "../../constants/message";
import { APIReturnType, CartItem } from "../../interface";

function* watchCart() {
  yield takeLatest(cartActionType.get.request, getCart);
  yield takeLatest(cartActionType.post.request, postCart);
  yield takeLatest(cartActionType.delete.request, deleteCart);
}

function* getCart() {
  const { isSucceeded, message, result } = yield call(api.cart.get);

  if (isSucceeded) {
    yield put(actions.cart.get.success(result));

    return;
  }

  yield put(actions.alert.request(message));
}

function* postCart(action: CartPostRequestActionType) {
  const { message } = yield call(api.cart.post, action.payload);

  yield put(actions.alert.request(message));
}

function* deleteCart(action: CartDeleteRequestActionType) {
  const ids = action.payload;
  const res: APIReturnType<null>[] = yield all(ids.map((id) => call(api.cart.delete, id)));

  const message = res.length && res.every(({ isSucceeded }) => isSucceeded) 
    ? res[0].message 
    : ERROR_MESSAGE.BAD_RESPONSE

  yield put(actions.alert.request(message));
  yield call(getCart);
}

export default watchCart;
