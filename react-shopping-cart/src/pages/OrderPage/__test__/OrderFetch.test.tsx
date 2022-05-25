import { fetchOrderItems } from "api";
import { API_URL } from "constants/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetchOrdersSuccess } from "redux/orders/orders.action";
import { getOrderItems } from "redux/orders/orders.saga";
import { put, call } from "redux-saga/effects";

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

const server = setupServer(
  rest.get(`${API_URL}/orders`, (req, res, ctx) => {
    return res(ctx.json(orderItems));
  })
);

describe("외부 API 테스트", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  test("주문목록을 불러올때 성공시 fetchOrderSuccess를 불러온다.", async () => {
    const iterator = getOrderItems();
    expect(iterator.next().value).toEqual(call(fetchOrderItems));

    expect(iterator.next(orderItems).value).toEqual(
      put(fetchOrdersSuccess(orderItems))
    );

    expect(iterator.next().done).toBeTruthy();
  });
});
