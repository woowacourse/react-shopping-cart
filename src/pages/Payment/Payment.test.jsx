import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  within,
} from "../../store/customReactTestLibrary";
import PATH from "../../constants/path";
import Order from "../Order/Order";
import Payment from "./Payment";
import Cart from "../Cart/Cart";

const cart = {
  1: {
    id: 1,
    name: "탕용기(소)",
    amount: 2,
    price: 57000,
    thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    checked: true,
    addedDate: Date.now(),
  },
};

describe("Payment", () => {
  test("결제하기 버튼을 누르면, 주문상품은 주문목록에 보여지고 장바구니에선 제거된다", () => {
    const mockAlert = jest.fn();
    window.alert = mockAlert;

    const history = createMemoryHistory();
    history.push(PATH.PAYMENT);

    render(
      <Router history={history}>
        <Cart />
        <Payment />
        <Order />
      </Router>,
      { initialState: { cart } }
    );

    expect(mockAlert.mock.calls.length).toBe(0);

    const button = screen.getByRole("button", { name: /결제하기/ });
    fireEvent.click(button);

    const cartItemList = screen.getByRole("list", { name: "cart-item-list" });
    expect(within(cartItemList).queryAllByRole("listitem")).toHaveLength(0);

    const ordersList = screen.getByRole("list", { name: "orders-list" });
    expect(within(ordersList).queryAllByRole("listitem")).toHaveLength(1);
  });
});
