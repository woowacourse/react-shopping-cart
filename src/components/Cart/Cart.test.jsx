import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  render,
  screen,
  within,
} from "../../store/customReactTestLibrary";
import Cart from "./Cart";

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

describe("Cart", () => {
  test("상품삭제 버튼 클릭하면 선택된항목만 제거된다", () => {
    window.confirm = jest.fn();
    window.confirm.mockReturnValue(true);

    render(<Cart />, { initialState: { cart } });
    const button = screen.getByRole("button", { name: "상품삭제" });
    fireEvent.click(button);

    const list = screen.getByRole("list", { name: "cart-item-list" });

    expect(within(list).queryAllByRole("listitem")).toHaveLength(0);
  });

  test("체크된 상품의 총금액이 결제 예상금액에 보여진다", () => {
    render(<Cart />, { initialState: { cart } });

    const complementary = screen.getByRole("complementary");

    expect(within(complementary).getByText(/114,000원/i)).toBeInTheDocument();
  });

  test("선택해제 체크박스를 클릭하면 주문하기 버튼이 비활성화된다", () => {
    render(<Cart />, { initialState: { cart } });

    const checkbox = screen.getByRole("checkbox", {
      name: /전체선택/,
    });
    fireEvent.click(checkbox);

    expect(screen.getByRole("button", { name: "주문하기" })).toBeDisabled();
  });
});
