import { all, call, delay, put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";
import { cartActionType, CartDeleteRequestActionType, CartPostRequestActionType } from "../../actions/cart";
import api from "../../apis";
import { CartItem } from "../../types";

function* watchCart() {
  yield takeLatest(cartActionType.get.request, getCart);
  yield takeLatest(cartActionType.post.request, postCart);
  yield takeLatest(cartActionType.delete.request, deleteCart);
}

function* getCart() {
  try {
    const cartItem: CartItem[] = yield call(api.cart.get);

    const productIds = cartItem.map(({ productId }) => productId);

    const deduplicatedCartItem = cartItem.filter(({ productId }, index) => productIds.indexOf(productId) === index);

    yield put(actions.cart.get.success(deduplicatedCartItem));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

function* postCart(action: CartPostRequestActionType) {
  try {
    yield call(api.cart.post, action.payload);

    yield put(actions.cart.post.success());
    yield put(actions.cart.animation.show());
  } catch (error) {
    yield put(actions.cart.post.failure({ requestErrorMessage: error.message }));
  }

  yield delay(1000);
  yield put(actions.cart.animation.hide());
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
