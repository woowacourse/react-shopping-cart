import orderListReducer, { initialState } from ".";
import actions from "../../actions";
import { Order } from "../../interface";

describe("orderListReducer test", () => {
  it("should handle orderList/get/success", () => {
    const orderList: Order[] = [
      {
        id: "1",
        itemList: [
          {
            id: "2",
            name: "브랜브랜철봉",
            price: 100000,
            imageSrc: "urlurl",
            quantity: 4,
          },
        ],
      },
    ];

    expect(orderListReducer(initialState, actions.orderList.get.success(orderList))).toEqual(orderList);
  });
});
