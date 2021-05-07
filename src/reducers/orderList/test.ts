import orderListReducer, { initialState } from ".";
import actions from "../../actions";
import { OrderList } from "../../interface";

describe("orderListReducer test", () => {
  it("should handle orderList/get/success", () => {
    const orderList: OrderList = {
      orderList: [{ id: "1", itemList: [{ id: "2", quantity: 5 }] }],
    };

    expect(
      orderListReducer(initialState, actions.orderList.get.success(orderList))
    ).toEqual({
      ...initialState,
      ...orderList,
      requestErrorMessage: null,
    });
  });

  it("should handle orderList/get/failure", () => {
    const requestErrorMessage = { requestErrorMessage: "요청에 실패했습니다." };

    expect(
      orderListReducer(
        initialState,
        actions.orderList.get.failure(requestErrorMessage)
      )
    ).toEqual({ ...initialState, ...requestErrorMessage });
  });
});
