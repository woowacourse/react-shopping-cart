import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import actions from "../../actions";
import api from "../../apis";
import watchOrderList from ".";
import { Order, OrderList } from "../../types";

const orderList: OrderList = {
  orderList: [
    {
      id: "1",
      itemList: [
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
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      itemList: [
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
          quantity: 1,
        },
      ],
    },
  ],
};

const order: Order = {
  id: "2",
  itemList: [
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
      quantity: 1,
    },
  ],
};

const errormessage = "getOrderList failed";

it("should getOrderList success", () => {
  return expectSaga(watchOrderList)
    .dispatch(actions.orderList.get.request())
    .provide([[call(api.orderList.get), orderList]])
    .put(actions.orderList.get.success(orderList))
    .run();
});

it("should getOrderList fail", () => {
  return expectSaga(watchOrderList)
    .dispatch(actions.orderList.get.request())
    .provide([[call(api.orderList.get), throwError(Error(errormessage))]])
    .put(actions.orderList.get.failure({ requestErrorMessage: errormessage }))
    .run();
});

it("should postOrderList success", () => {
  return expectSaga(watchOrderList)
    .dispatch(actions.orderList.item.post.request(order))
    .provide([[call(api.orderList.item.post, order), {}]])
    .put(actions.orderList.item.post.success())
    .run();
});

it("should postOrderList fail", () => {
  return expectSaga(watchOrderList)
    .dispatch(actions.orderList.item.post.request(order))
    .provide([[call(api.orderList.item.post, order), throwError(Error(errormessage))]])
    .put(actions.orderList.item.post.failure({ requestErrorMessage: errormessage }))
    .run();
});
