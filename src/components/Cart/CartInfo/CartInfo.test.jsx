import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
} from "../../../store/customReactTestLibrary";
import CartInfo from "./CartInfo";

const cart = {
  1: {
    name: "탕용기(소)",
    price: 57000,
    thumbnail: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    id: 1,
    amount: 1,
    addedDate: 1621093335563,
    checked: true,
  },
  2: {
    name: "냉면용기(대/CN/흑색)",
    price: 57500,
    thumbnail:
      "https://cdn-mart.baemin.com/sellergoods/main/498642e7-bcba-42cc-966e-6447e5287dc8.jpg",
    id: 2,
    amount: 1,
    addedDate: 1621093336108,
    checked: true,
  },
  5: {
    name: "도시락용기-2호",
    price: 42500,
    thumbnail: "https://cdn-mart.baemin.com/goods/12/1551257226350m0.jpg",
    id: 5,
    amount: 1,
    addedDate: 1621093337123,
    checked: true,
  },
  6: {
    name: "올인원 세트-물티수저",
    price: 55600,
    thumbnail:
      "https://cdn-mart.baemin.com/goods/13/D6-PB-20277_%EC%98%AC%EC%9D%B8%EC%9B%90-%EC%84%B8%ED%8A%B8_%EB%AC%BC%ED%8B%B0%EC%88%98%EC%A0%80_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
    id: 6,
    amount: 1,
    addedDate: 1621093336681,
    checked: true,
  },
};

describe("CartInfo", () => {
  test("장바구니에 상품이 없는 경우, checkAll 체크박스는 체크해제되어 있다", () => {
    render(<CartInfo />);

    const checkAllCheckBox = screen.getByRole("checkbox", { name: "전체선택" });

    expect(checkAllCheckBox).not.toBeChecked();
  });

  test("모든 상품이 체크되어 있는 경우, 전체선택 checkAll 체크박스는 체크되어 있다", () => {
    render(<CartInfo />, { initialState: { cart } });

    const checkAllCheckBox = screen.getByRole("checkbox", { name: "전체선택" });

    expect(checkAllCheckBox).toBeChecked();
  });

  test("상품이 하나라도 체크해제된 경우, checkAll 체크박스는 체크가 해제된다", () => {
    render(<CartInfo />, { initialState: { cart } });

    const checkAllCheckBox = screen.getByRole("checkbox", {
      name: /전체선택/i,
    });

    Object.values(cart)
      .map(({ name }) => name)
      .slice(0, -1)
      .forEach((name) => {
        fireEvent.click(screen.getByRole("checkbox", { name }));

        expect(checkAllCheckBox).not.toBeChecked();
      });
  });
});
