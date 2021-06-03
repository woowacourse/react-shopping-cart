import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import actions from "../../actions";

import { CartItem } from "../../types";
import watchCart from ".";
import api from "../../apis";

const cartItem: CartItem[] = [
  {
    cartId: "qwer1234",
    name: "[든든] 유부 슬라이스 500g",
    imageUrl: "https://cdn-mart.baeminw.com/goods/custom/20200525/11153-main-01.png",
    price: 4900,
  },
  {
    cartId: "1243qwer",
    name: "[든든] 유부 슬라이스 500g",
    imageUrl: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
    price: 4900,
  },
];

const errormessage = "getCart failed";

it("should getCart success", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.get.request())
    .provide([[call(api.cart.get), cartItem]])
    .put(actions.cart.get.success(cartItem))
    .run();
});

it("should getCart fail", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.get.request())
    .provide([[call(api.cart.get), throwError(Error(errormessage))]])
    .put(actions.cart.get.failure({ requestErrorMessage: errormessage }))
    .run();
});

it("should postCart success", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.post.request(cartItem[0].cartId))
    .provide([[call(api.cart.post, cartItem[0].cartId), {}]])
    .put(actions.cart.post.success())
    .run();
});

it("should postCart fail", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.post.request(cartItem[0].cartId))
    .provide([[call(api.cart.post, cartItem[0].cartId), throwError(Error(errormessage))]])
    .put(actions.cart.post.failure({ requestErrorMessage: errormessage }))
    .run();
});

it("should deleteCart success", () => {
  const ids = ["1", "2", "3"];

  return expectSaga(watchCart)
    .dispatch(actions.cart.delete.request(ids))
    .provide([
      [call(api.cart.delete, "1"), {}],
      [call(api.cart.delete, "2"), {}],
      [call(api.cart.delete, "3"), {}],
      [call(api.cart.get), cartItem],
    ])
    .put(actions.cart.delete.success())
    .put(actions.cart.get.success(cartItem))
    .run();
});

it("should deleteCart fail", () => {
  const ids = ["1", "2", "3"];

  return expectSaga(watchCart)
    .dispatch(actions.cart.delete.request(ids))
    .provide([
      [call(api.cart.delete, "1"), throwError(Error(errormessage))],
      [call(api.cart.delete, "2"), {}],
      [call(api.cart.delete, "3"), {}],
    ])
    .put(actions.cart.delete.failure({ requestErrorMessage: errormessage }))
    .run();
});
