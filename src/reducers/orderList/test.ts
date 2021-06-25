import orderListReducer, { initialState } from ".";
import actions from "../../actions";
import { OrderList } from "../../types";

describe("orderListReducer test", () => {
  it("should handle orderList/get/success", () => {
    const orderList: OrderList = [
      {
        orderId: "1",
        order_details: [
          { productId: "1", name: "강릉초당인절미순두부", price: 2500, imageUrl: "www.coupang.com", quantity: 5 },
        ],
      },
    ];

    expect(orderListReducer(initialState, actions.orderList.get.success(orderList))).toEqual({
      ...initialState,
      orderList,
    });
  });

  it("should handle orderList/get/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(orderListReducer(initialState, actions.orderList.get.failure(requestErrorMessage))).toEqual({
      ...initialState,
      ...requestErrorMessage,
    });
  });

  it("should handle orderList/item/post/success", () => {
    expect(orderListReducer(initialState, actions.orderList.item.post.success())).toEqual({
      ...initialState,
    });
  });

  it("should handle orderList/item/post/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(orderListReducer(initialState, actions.orderList.item.post.failure(requestErrorMessage))).toEqual({
      ...initialState,
      ...requestErrorMessage,
    });
  });
});
