import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShoppingCart } from "../src/pages/shoppingCart/shoppingCart";
import { MemoryRouter } from "react-router-dom";
import { server } from "../src/mocks/server";
import shoppingCart from "../src/mocks/shoppingCart.json";
import { getTotalPrice } from "../src/utils/getTotalPrice";
import { CartItemTypes } from "../src/types/cartItem";
import { resetCartItems } from "../src/mocks/handlers";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("장바구니 페이지 테스트", () => {
  beforeEach(() => {
    resetCartItems();
  });

  it("장바구니 삭제 버튼을 누르면 해당 제품이 삭제된다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    await waitFor(() => {
      const prevDeleteButtons = screen.getAllByText("삭제");
      expect(prevDeleteButtons.length).toBe(3);
      fireEvent.click(prevDeleteButtons[0]);
    });

    await waitFor(() => {
      const currentDeleteButtons = screen.getAllByText("삭제");
      expect(currentDeleteButtons.length).toBe(2);
    });
  });

  it("장바구니에 담긴 아이템의 수량을 감소시키면 주문 금액이 감소한다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const selectedId = shoppingCart.content.map((e) => e.id.toString());
    const prevTotalPrice = getTotalPrice({
      cartItems: shoppingCart.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    const orderPrice = await screen.findByTestId("orderPrice");
    await waitFor(() => {
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });

    await waitFor(() => {
      const minusButtons = screen.getAllByTestId("quantity-minus-button");
      fireEvent.click(minusButtons[0]);

      const currentOrderPrice = screen.getByTestId("orderPrice");
      const currentTotalPrice =
        prevTotalPrice - shoppingCart.content[0].product.price;

      expect(currentOrderPrice.textContent).toBe(
        `${currentTotalPrice.toLocaleString("ko")}원`
      );
    });
  });

  it("장바구니에 담긴 아이템의 수량을 증가시키면 주문 금액이 증가한다.", async () => {
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>
    );

    const selectedId = shoppingCart.content.map((e) => e.id.toString());
    const prevTotalPrice = getTotalPrice({
      cartItems: shoppingCart.content as CartItemTypes[],
      selectedCartId: selectedId,
    });

    const orderPrice = await screen.findByTestId("orderPrice");
    await waitFor(() => {
      expect(orderPrice.textContent).toBe(
        `${prevTotalPrice.toLocaleString("ko")}원`
      );
    });

    await waitFor(() => {
      const plusButtons = screen.getAllByTestId("quantity-plus-button");
      fireEvent.click(plusButtons[0]);

      const currentOrderPrice = screen.getByTestId("orderPrice");
      const currentTotalPrice =
        prevTotalPrice + shoppingCart.content[0].product.price;

      expect(currentOrderPrice.textContent).toBe(
        `${currentTotalPrice.toLocaleString("ko")}원`
      );
    });
  });
});
