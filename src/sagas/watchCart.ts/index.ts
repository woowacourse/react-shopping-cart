import { call, put, takeLatest } from "redux-saga/effects";
import actions from "../../actions";
import cart, { cartPostActionType } from "../../actions/cart";

// TODO: type 상수화 => 필히 고려
function* watchCart() {
  yield takeLatest(actions.cart.get.request().type, getCart);
  yield takeLatest("cart/post/request", postCart);
}

function* getCart() {
  try {
    // const cart = yield call(Api, args)
    // yield put(acitons.cart.get.success(cart));
  } catch (error) {
    yield put(actions.cart.get.failure({ requestErrorMessage: error.message }));
  }
}

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
