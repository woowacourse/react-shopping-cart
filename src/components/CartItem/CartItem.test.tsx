import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartItem from "./CartItem";
import { CartItemsResponse } from "../../types/cartItems";

jest.mock("../../apis/cartItem", () => ({
  patchCartItem: jest.fn(() => Promise.resolve()),
  deleteCartItem: jest.fn(() => Promise.resolve()),
}));

const cartItem: CartItemsResponse["content"][number] = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    name: "Test Product",
    price: 1000,
    imageUrl: "/test-image.png",
    category: "Test Category",
  },
};

describe("CartItem", () => {
  it("PlusMinusButton의 +, - 버튼을 클릭하면 수량이 증가/감소한다", async () => {
    const refetch = jest.fn();
    render(
      <CartItem
        cartItem={cartItem}
        isSelected={false}
        handleCheckboxClick={() => {}}
        refetch={refetch}
      />
    );

    // 수량이 2로 표시되는지 확인
    expect(screen.getByText("2")).toBeInTheDocument();

    // + 버튼 클릭
    const plusButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "+");
    fireEvent.click(plusButton!);

    // - 버튼 클릭
    const minusButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "-");
    fireEvent.click(minusButton!);

    // 비동기 작업이 완료될 때까지 대기
    waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(2);
    });
  });

  it("장바구니 물건의 수량을 변경하면, 가격이 변경된다", async () => {
    const refetch = jest.fn();
    render(
      <CartItem
        cartItem={cartItem}
        isSelected={false}
        handleCheckboxClick={() => {}}
        refetch={refetch}
      />
    );

    const plusButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "+");
    fireEvent.click(plusButton!);

    waitFor(() => {
      expect(screen.getByText("3000")).toBeInTheDocument();
    });
  });
});
