import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import watchProducts from ".";
import actions from "../../actions";
import api from "../../apis";
import { throwError } from "redux-saga-test-plan/providers";

const products = {
  products: {
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
  },
};

const errormessage = "getProducts failed";

it("should getProducts success", () => {
  return expectSaga(watchProducts)
    .dispatch(actions.products.get.request())
    .provide([[call(api.products.get), products]])
    .put(actions.products.get.success(products))
    .run();
});

it("should getProducts fail", () => {
  return expectSaga(watchProducts)
    .dispatch(actions.products.get.request())
    .provide([[call(api.products.get), throwError(Error(errormessage))]])
    .put(actions.products.get.failure({ requestErrorMessage: errormessage }))
    .run();
});
