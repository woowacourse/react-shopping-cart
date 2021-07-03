import { call, CallEffect } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import watchCart from ".";
import actions from "../../actions";
import api from "../../apis";
import { APIReturnType, CartItem } from "../../interface";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/message";

const cartItems = [
  {
    id: "1",
    name: "[든든] 유부 슬라이스 500g",
    imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
    price: 4900,
    quantity: 4,
  },
  {
    id: "2",
    name: "[든든] 유부 슬라이스 500g",
    imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
    price: 4900,
    quantity: 4,
  },
];

const succeededResponseOfGet: APIReturnType<CartItem[]> = {
  isSucceeded: true,
  message: "",
  result: cartItems,
};

const faliedResponseOfGet: APIReturnType<null> = {
  isSucceeded: false,
  message: ERROR_MESSAGE.BAD_RESPONSE,
  result: null,
};

const responseOfPost: APIReturnType<null> = {
  isSucceeded: true,
  message: SUCCESS_MESSAGE.POST_CART,
  result: null,
};

const responseOfDelete: APIReturnType<null> = {
  isSucceeded: true,
  message: SUCCESS_MESSAGE.DELETE_CART,
  result: null,
}

describe("cart saga test", () => {
  it("should getCart success", () => {
    return expectSaga(watchCart)
      .dispatch(actions.cart.get.request())
      .provide([[call(api.cart.get), succeededResponseOfGet]])
      .put(actions.cart.get.success(succeededResponseOfGet.result))
      .run();
  });

  it("should getCart fail", () => {
    return expectSaga(watchCart)
      .dispatch(actions.cart.get.request())
      .provide([[call(api.cart.get), faliedResponseOfGet]])
      .put(actions.alert.request(faliedResponseOfGet.message))
      .run();
  });

  it("should postCart show message", () => {
    return expectSaga(watchCart)
      .dispatch(actions.cart.post.request(cartItems[0].id))
      .provide([[call(api.cart.post, cartItems[0].id), responseOfPost]])
      .put(actions.alert.request(responseOfPost.message))
      .run();
  });

  it("should deleteCart show message", () => {
    const ids = ["1", "2"];
    const mocks:[
      CallEffect<APIReturnType<null>>,
      APIReturnType<null>
    ][] = ids.map(id => [call(api.cart.delete, id), responseOfDelete])

    return expectSaga(watchCart)
      .dispatch(actions.cart.delete.request(ids))
      .provide(mocks)
      .put(actions.alert.request(SUCCESS_MESSAGE.DELETE_CART))
      .call(api.cart.get)
      .run();
  });
});