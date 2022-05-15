import { all, call } from 'redux-saga/effects';
import { productsSaga } from 'redux/products/products.saga';
import { cartsSaga } from 'redux/carts/carts.saga';

export default function* rootSaga() {
  yield all([call(productsSaga), call(cartsSaga)]);
}
