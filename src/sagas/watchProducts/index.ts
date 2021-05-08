import { put, takeLatest } from "redux-saga/effects";

import actions from "../../actions";

function* watchProducts() {
  yield takeLatest(actions.products.get.request().type, getProducts);
}

function* getProducts() {
  try {
    // const products = yield call(Api,args)
    // yield put(actions.products.get.success(products));
  } catch (error) {
    yield put(
      actions.products.get.failure({ requestErrorMessage: error.message })
    );
  }
}

export default watchProducts;
