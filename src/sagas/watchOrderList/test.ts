import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import actions from "../../actions";
import api from "../../apis";
import watchOrderList from ".";
import { APIReturnType, Order } from "../../interface";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/message";

const orderList: Order[] = [
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
  ];

const orderId = "1";
const orderQuantity = 2;

describe("orderList saga test", () => {
  it("should getOrderList success", () => {
    const result: Order[] = orderList;
    const response: APIReturnType<Order[]> = {
      isSucceeded: true,
      message: "",
      result,
    };

    return expectSaga(watchOrderList)
      .dispatch(actions.orderList.get.request())
      .provide([[call(api.orderList.get), response]])
      .put(actions.orderList.get.success(result))
      .run();
  });

  it("should getOrderList fail", () => {
    const message = ERROR_MESSAGE.BAD_RESPONSE;
    const response: APIReturnType<null> = {
      isSucceeded: false,
      message,
      result: null,
    };

    return expectSaga(watchOrderList)
      .dispatch(actions.orderList.get.request())
      .provide([[call(api.orderList.get), response]])
      .put(actions.alert.request(message))
      .run();
  });

  it("should postOrderList", () => {
    const message = SUCCESS_MESSAGE.POST_ORDER;
    const response: APIReturnType<null> = {
      isSucceeded: true,
      message,
      result: null,,
    };;

    return expectSaga(watchOrderList)
      .dispatch(actions.orderList.post.request(orderId, orderQuantity))
      .provide([[call(api.orderList.post, orderId, orderQuantity), response]])
      .put(actions.alert.request(message))
      .run();
  });
});