import { all, call, put, takeLatest } from "redux-saga/effects";
import firebase from "firebase";

import actions from "../../actions";
import { cartDeleteRequestActionType, cartPostRequestActionType } from "../../actions/cart";
import api from "../../apis";
import { CartItem } from "../../interface";
import { isDefined } from "../../util/typeGuard";

// TODO: type 상수화 => 필히 고려
function* watchCart() {
  yield takeLatest(actions.cart.get.request().type, getCart);
  yield takeLatest("cart/post/request", postCart);
  yield takeLatest("cart/delete/request", deleteCart);
}

function* getCart() {
  try {
    const response: firebase.firestore.QuerySnapshot<CartItem> = yield call(api.cart.get);

    const cartItem = response.docs.map((cartItem) => cartItem.data()).filter(isDefined);

    yield put(actions.cart.get.success({ cart: cartItem }));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

function* postCart(action: cartPostRequestActionType) {
  try {
    console.log(action.payload);
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
