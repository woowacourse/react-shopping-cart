import { all, call } from 'redux-saga/effects';

import { cartsSaga } from 'redux/carts/carts.saga';
import { productsSaga } from 'redux/products/products.saga';

export default function* rootSaga() {
  yield all([call(productsSaga), call(cartsSaga)]);
}
