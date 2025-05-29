import { describe, it, vi, beforeEach, Mock } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import App from "../src/App";
import * as cartAPI from "../src/api/cart/getCartProduct";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";

vi.mock("../src/api/cart/getCartProduct", () => ({
  getCartProduct: vi.fn(),
}));
const mockCartItems = {
  content: [
    {
      id: 1234,
      product: {
        category: "식료품",
        id: 1,
        name: "이름",
        price: 1000,
        quantity: 1,
        imageUrl: `/image.png`,
      },
      quantity: 3,
    },
    {
      id: 1235,
      product: {
        category: "패션 잡화",
        id: 2,
        name: "이름",
        price: 2000,
        quantity: 1,
        imageUrl: `/image-png`,
      },
      quantity: 5,
    },
  ],
};

describe("장바구니 페이지 로딩 테스트", () => {
  beforeEach(() => {
    (cartAPI.getCartProduct as Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 데이터를 불러오면 장바구니 리스트를 보여준다.", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      const cartList = screen.getByTestId("cart-list");
      expect(cartList.children.length).toBe(2);
    });
  });

  it("진입 시, 전체 선택이 되어 있다.", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      const allSelected = screen.getByTestId("all-selected");
      expect(allSelected).toBeChecked();
    });
  });
});
