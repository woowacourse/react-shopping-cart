import { expectSaga } from "redux-saga-test-plan";

import watchCart from ".";
import actions from "../../actions";
import api from "../../apis";
import { throwError } from "redux-saga-test-plan/providers";
import { CartItem } from "../../interface";
import { call } from "redux-saga-test-plan/matchers";

const cartItem: CartItem[] = [
    {
      id: "qwer1234",
      name: "[든든] 유부 슬라이스 500g",
      imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
      price: 4900,
      quantity: 4,
    },
    {
      id: "1243qwer",
      name: "[든든] 유부 슬라이스 500g",
      imageSrc: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
      price: 4900,
      quantity: 4,
    }  
  ];

const errormessage = "getCart failed";

it("should getCart success", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.get.request())
    .provide([[call(api.cart.get), cartItem]])
    .put(actions.cart.get.success({cart: cartItem}))
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
    .dispatch(actions.cart.post.request(cartItem[0]))
    .provide([[call(api.cart.post, cartItem[0]), {}]])
    .put(actions.cart.post.success())
    .run();
});

it("should postCart fail", () => {
  return expectSaga(watchCart)
    .dispatch(actions.cart.post.request(cartItem[0]))
    .provide([[call(api.cart.post, cartItem[0]), throwError(Error(errormessage))]])
    .put(actions.cart.post.failure({ requestErrorMessage: errormessage }))
    .run();
});

// it("should deleteCart success", () => {
//   const ids = ["1","2"];
  
//   return expectSaga(watchCart)
//     .dispatch(actions.cart.delete.request(ids))
//     .provide([[call(api.cart.delete, ids[0]), {}]])
//     .put(actions.cart.delete.success())
//     .dispatch(actions.cart.get.request())
//     .provide([[call(api.cart.get), cartItem]])
//     .put(actions.cart.get.success({cart: cartItem}))
//     .run();
// });

// it("should deleteCart fail", () => {
//   const ids = ["1"];

//   return expectSaga(watchCart)
//     .dispatch(actions.cart.delete.request(ids))
//     .provide([
//       [call(api.cart.delete, "1"), throwError(Error(errormessage))],
//     ])
//     .put(actions.cart.delete.failure({requestErrorMessage: errormessage }))
//     .run();
// });
