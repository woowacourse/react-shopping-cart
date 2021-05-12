import { all, call, put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { cartActionType, CartDeleteRequestActionType, CartPostRequestActionType } from "../../actions/cart";
import api from "../../apis";
import { CartItem } from "../../interface";

function* watchCart() {
  yield takeLatest(cartActionType.get.request, getCart);
  yield takeLatest(cartActionType.post.request, postCart);
  yield takeLatest(cartActionType.delete.request, deleteCart);
}

function* getCart() {
  try {
    const cartItem: CartItem[] = yield call(api.cart.get);

    yield put(actions.cart.get.success({ cart: cartItem }));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

function* postCart(action: CartPostRequestActionType) {
  try {
    yield call(api.cart.post, action.payload);

    yield put(actions.cart.post.success());
  } catch (error) {
    yield put(actions.cart.post.failure({ requestErrorMessage: error.message }));
  }
}

function* deleteCart(action: CartDeleteRequestActionType) {
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
