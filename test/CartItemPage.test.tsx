import "@testing-library/jest-dom";
import { vi } from "vitest";
import cartItemsApi from "../src/apis/cartItems";
import { fireEvent, screen } from "@testing-library/react";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../src/constants";
import { setupCartPageTest } from "./utils/setupCartItemPageTest";
import { createMockCartItem } from "./utils/mockCartItems";

vi.mock("../apis/cartItems");

describe("장바구니 페이지 테스트", () => {
  it("페이지에 장바구니 상품이 렌더링이 된다.", async () => {
    const mockCartItems = [createMockCartItem(1, "콜라", 1500, "식료품", 2)];
    setupCartPageTest(mockCartItems);
    expect(await screen.findByText("콜라")).toBeInTheDocument();
  });

  it("페이지에 장바구니 상품이 렌더링되고 삭제할 수 있다", async () => {
    const mockCartItems = [createMockCartItem(1, "콜라", 1500, "식료품", 2)];

    cartItemsApi.delete = vi.fn(async (id: number) => {
      const index = mockCartItems.findIndex((item) => item.id === id);
      if (index !== -1) mockCartItems.splice(index, 1);
    });

    setupCartPageTest(mockCartItems);
    expect(await screen.findByText("콜라")).toBeInTheDocument();

    const deleteButton = await screen.findByTestId("delete-cart-item-button");
    fireEvent.click(deleteButton);

    expect(
      await screen.findByText("장바구니에 담은 상품이 없습니다.")
    ).toBeInTheDocument();
  });

  it("수량 조절 버튼을 클릭해 수량을 조절 할 수 있다", async () => {
    const mockCartItems = [createMockCartItem(1, "콜라", 1500, "식료품", 2)];

    cartItemsApi.patch = vi.fn(async (id: number, quantity: number) => {
      const index = mockCartItems.findIndex((item) => item.id === id);
      mockCartItems[index].quantity = quantity;
    });

    setupCartPageTest(mockCartItems);

    const increaseButton = await screen.findByTestId("increase-button");
    fireEvent.click(increaseButton);

    expect(await screen.findByText("3")).toBeInTheDocument();
  });

  it(`주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT}원 이상이면 배송비는 0원이다.`, async () => {
    const mockCartItems = [
      createMockCartItem(1, "맥북", 1500000, "패션잡화", 2),
    ];
    setupCartPageTest(mockCartItems);

    const shippingFee = await screen.findByTestId("shipping-fee");
    const toggleButton = screen.getByTestId("item-toggle");
    fireEvent.click(toggleButton);
    expect(shippingFee.textContent).toBe("0원");
  });

  it(`주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT}원 미만이면 배송비는 ${SHIPPING_FEE}원이다.`, async () => {
    const mockCartItems = [
      createMockCartItem(1, "텀블러", 5000, "패션잡화", 2),
    ];
    setupCartPageTest(mockCartItems);

    const shippingFee = await screen.findByTestId("shipping-fee");
    expect(shippingFee.textContent).toBe("3,000원");
  });
});
