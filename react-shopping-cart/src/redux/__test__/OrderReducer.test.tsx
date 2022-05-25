import { addOrderStart, addOrderSuccess } from "redux/orders/orders.action";
import ordersReducer from "redux/orders/orders.reducer";

describe("action에 맞게 Order이 잘 작동하는가", () => {
  test("addOrderItems가 들어오면 정상적으로 Order상태에 추가해야한다.", () => {
    const initialOrderState = {
      loading: false,
      orders: [],
      error: null,
    };
    const orderItems = [
      {
        thumbnail: "test-url",
        name: "테스트 상품",
        quantity: 3,
        user: "sming",
        id: "sming2",
        price: 23421,
        checked: true,
      },
      {
        thumbnail: "test-url",
        name: "테스트 상품",
        quantity: 3,
        user: "sming",
        id: "sming2",
        price: 23421,
        checked: true,
      },
    ];

    expect(ordersReducer(initialOrderState, addOrderStart(orderItems))).toEqual(
      {
        error: null,
        loading: true,
        orders: [],
      }
    );

    expect(
      ordersReducer(initialOrderState, addOrderSuccess(orderItems))
    ).toEqual({
      error: null,
      loading: false,
      orders: orderItems,
    });
  });
});
