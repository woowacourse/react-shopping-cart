import React from "react";

import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  within,
} from "../../store/customReactTestLibrary";
import OrdersList from "./OrdersList";
import Cart from "../Cart/Cart";

const order = {
  1: [
    {
      name: "올인원 세트-물티수저",
      price: 55600,
      thumbnail:
        "https://cdn-mart.baemin.com/goods/13/D6-PB-20277_%EC%98%AC%EC%9D%B8%EC%9B%90-%EC%84%B8%ED%8A%B8_%EB%AC%BC%ED%8B%B0%EC%88%98%EC%A0%80_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
      id: 6,
      amount: 1,
      addedDate: 1620715937937,
      checked: true,
    },
  ],
};

describe("OrdersList", () => {
  test("주문목록에서 장바구니 버튼을 누르면 해당 상품이 장바구니에 추가된다", () => {
    render(
      <>
        <Cart />
        <OrdersList />
      </>,
      { initialState: { order } }
    );

    const button = screen.getByRole("button", { name: "장바구니" });
    fireEvent.click(button);

    const cartItemList = screen.getByRole("list", { name: "cart-item-list" });
    expect(within(cartItemList).queryAllByRole("listitem")).toHaveLength(1);
  });
});
