import { all, call, put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { cartDeleteRequestActionType, cartPostRequestActionType } from "../../actions/cart";
import api from "../../apis";
import { CartItem } from "../../interface";

// TODO: type 상수화 => 필히 고려
function* watchCart() {
  yield takeLatest(actions.cart.get.request().type, getCart);
  yield takeLatest("cart/post/request", postCart);
  yield takeLatest("cart/delete/request", deleteCart);
}

function* getCart() {
  try {
    const cartItem: CartItem[] = yield call(api.cart.get);

    yield put(actions.cart.get.success({ cart: cartItem }));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

function* postCart(action: cartPostRequestActionType) {
  try {
    yield call(api.cart.post, action.payload);

    yield put(actions.cart.post.success());
  } catch (error) {
    yield put(actions.cart.post.failure({ requestErrorMessage: error.message }));
  }
}

function* deleteCart(action: cartDeleteRequestActionType) {
  try {
    const ids = action.payload;

    yield all(ids.map((id) => call(api.cart.delete, id)));

    yield put(actions.cart.delete.success());

    yield call(getCart);
  } catch (error) {
    yield put(actions.cart.delete.failure({ requestErrorMessage: error.message }));
  }
}

export default watchCart;
