import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import watchProducts from ".";
import actions from "../../actions";
import api from "../../apis";
import { APIReturnType, ProductsObject } from "../../interface";
import { ERROR_MESSAGE } from "../../constants/message";

const products: ProductsObject = {
    "1": {
      name: "[든든] 유부 슬라이스 500g",
      imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
      price: 4900,
    },
    "2": {
      name: "[든든] 유부 슬라이스 500g",
      imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
      price: 4900,
    },
};

it("should getProducts success", () => {
  const response: APIReturnType<ProductsObject> = {
    isSucceeded: true,
    message: "",
    result: products,
  }

  return expectSaga(watchProducts)
    .dispatch(actions.products.get.request())
    .provide([[call(api.products.get), response]])
    .put(actions.products.get.success(products))
    .run();
});

it("should getProducts fail", () => {
  const message = ERROR_MESSAGE.BAD_RESPONSE;
  const response: APIReturnType<null> = {
    isSucceeded: false,
    message,
    result: null,
  };

  return expectSaga(watchProducts)
    .dispatch(actions.products.get.request())
    .provide([[call(api.products.get), response]])
    .put(actions.alert.request(message))
    .run();
});
