import { put, call, takeLatest } from "redux-saga/effects";
import firebase from "firebase";

import actions from "../../actions";
import api from "../../apis";
import { Id, Product, ProductsObject } from "../../interface";

function* watchProducts() {
  yield takeLatest(actions.products.get.request().type, getProducts);
}

function* getProducts() {
  try {
    const response: firebase.firestore.DocumentSnapshot<
      Id & Product
    >[] = yield call(api.products.get);

    const products: ProductsObject = response.reduce(
      (acc: ProductsObject, product) => {
        const productData: (Id & Product) | undefined = product.data();

        if (productData === undefined) {
          return acc;
        }

        acc.products[productData.id] = {
          name: productData.name,
          price: productData.price,
          imageSrc: productData.imageSrc,
        };

        return acc;
      },
      { products: {} }
    );

    yield put(actions.products.get.success(products));
  } catch (error) {
    yield put(
      actions.products.get.failure({ requestErrorMessage: error.message })
    );
  }
}

export default watchProducts;
