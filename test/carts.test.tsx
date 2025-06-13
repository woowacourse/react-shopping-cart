import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../src/App";
import { CartProvider } from "../src/stores/CartContext";

vi.mock("../src/api/getCartList", () => ({
  default: vi.fn(),
}));

vi.mock("../src/api/removeProductItem", () => ({
  default: vi.fn(),
}));

vi.mock("../src/api/updateCartItem", () => ({
  default: vi.fn(),
}));

import getCartList from "../src/api/getCartList";
import removeProductItem from "../src/api/removeProductItem";
import updateCartItem from "../src/api/updateCartItem";

const mockgetCartList = getCartList as vi.MockedFunction<typeof getCartList>;
const mockremoveProductItem = removeProductItem as vi.MockedFunction<
  typeof removeProductItem
>;
const mockupdateCartItem = updateCartItem as vi.MockedFunction<
  typeof updateCartItem
>;

const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      name: "상품1",
      price: 10000,
      imageUrl: "image1.jpg",
      category: "식료품",
      quantity: 10,
    },
  },
];

describe("RTL Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockgetCartList.mockResolvedValue({ content: mockCartItems });
    mockremoveProductItem.mockResolvedValue(undefined);
    mockupdateCartItem.mockResolvedValue(undefined);
  });

  it("should render", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("SHOP")).toBeInTheDocument();
    });
  });
});

describe("장바구니 기능 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockgetCartList.mockResolvedValue({ content: mockCartItems });
    mockremoveProductItem.mockResolvedValue(undefined);
    mockupdateCartItem.mockResolvedValue(undefined);
  });

  it("장바구니 페이지가 정상적으로 렌더링된다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });
  });

  it("상품 선택/해제 시 결제 금액이 동적으로 변경된다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole("checkbox");
    const itemCheckbox = checkboxes.find(
      (checkbox) => checkbox.getAttribute("id") !== "select-all"
    );

    const totalPrice = screen
      .getByText("총 결제 금액")
      .closest("div")
      ?.querySelector("p:last-child");

    if (itemCheckbox && totalPrice) {
      const initialPrice = totalPrice.textContent;
      fireEvent.click(itemCheckbox);

      await waitFor(() => {
        expect(totalPrice.textContent).not.toBe(initialPrice);
      });
    }
  });

  it("상품 수량은 +/- 버튼으로 변경 가능하다", async () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const increaseButton = screen.getByRole("button", {
      name: /수량 증가/i,
    });

    if (increaseButton) {
      fireEvent.click(increaseButton);

      await waitFor(() => {
        expect(mockupdateCartItem).toHaveBeenCalled();
      });
    }
  });

  it("상품 삭제가 가능하다", async () => {
    mockgetCartList
      .mockResolvedValueOnce({ content: mockCartItems })
      .mockResolvedValueOnce({ content: [] });

    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("상품1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", { name: "삭제" });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("장바구니에 담은 상품이 없습니다.")
      ).toBeInTheDocument();
    });
  });

  it("장바구니가 비어있을 때 적절한 메시지가 표시된다", async () => {
    mockgetCartList.mockResolvedValue({ content: [] });

    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("장바구니에 담은 상품이 없습니다.")
      ).toBeInTheDocument();
    });
  });
});
