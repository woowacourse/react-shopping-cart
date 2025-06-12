// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "../src/pages/Cart/Cart";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CartItemType, ProductItemType } from "../src/types/response";

const MOCK_PRODUCTS: ProductItemType[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: index + 1,
    name: `상품 ${index + 1}`,
    category: index % 2 === 0 ? "식료품" : "패션잡화",
    price: 1000 + index * 100,
    imageUrl:
      index % 3 === 0 ? `/images/product-${index + 1}.jpg` : "/example.png",
    quantity: 5,
  })
);

const cartItems: CartItemType[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  quantity: 3,
  product: MOCK_PRODUCTS[index],
}));

type FetchDataProps = {
  onSuccess: (data: CartItemType[]) => void;
};

vi.mock("../src/hooks/useFetch", () => {
  return {
    default: () => ({
      fetchData: async ({ onSuccess }: FetchDataProps) => {
        onSuccess(cartItems);
      },
      isLoading: false,
    }),
  };
});

describe("Cart 주문확인 버튼", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Cart />
      </MemoryRouter>
    );
    await screen.findByText("전체선택");
  });

  it("선택된 장바구니 아이템이 존재할 때, 주문확인 버튼이 활성화 된다", () => {
    const orderBtn = screen.getByRole("button", { name: "주문 확인" });
    expect(orderBtn).toBeEnabled();
  });

  it("선택된 장바구니 아이템이 없을 때, 주문확인 버튼이 비활성화 된다", async () => {
    const user = userEvent.setup();

    const allBtn = screen.getByLabelText("전체선택");
    await user.click(allBtn);
    const orderBtn = screen.getByRole("button", { name: "주문 확인" });
    expect(orderBtn).toBeDisabled();
  });

  it("활성화된 주문확인 버튼을 눌렀을 때, 주문확인 페이지로 이동한다", async () => {
    const user = userEvent.setup();
    const orderBtn = screen.getByRole("button", { name: "주문 확인" });
    await user.click(orderBtn);

    await screen.findByText("주문 확인");
  });
});
