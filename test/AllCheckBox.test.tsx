// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "../src/pages/Cart/Cart";
import userEvent from "@testing-library/user-event";
import { CartItemType, ProductItemType } from "../src/types/response";

const MOCK_PRODUCTS: ProductItemType[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: index + 1,
    name: `상품 ${index + 1}`,
    category: index % 2 === 0 ? "식료품" : "패션잡화",
    price: 1000 + index * 100,
    imageUrl:
      index % 3 === 0 ? `/images/product-${index + 1}.jpg` : "/example.png",
    quantity: index % 6 === 0 ? 0 : 5,
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

describe("Cart 전체선택 동기화", () => {
  beforeEach(async () => {
    localStorage.clear();

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    await screen.findByText("전체선택");
  });

  it("초기 렌더링 시 전체선택 버튼과 모든 아이템 체크박스가 체크된 상태여야 한다", async () => {
    const allBtn = screen.getByLabelText("전체선택");
    const allImg = within(allBtn).getByRole("img", { name: "체크 박스" });
    expect(allImg).toHaveAttribute("src", "enabledCheck.svg");

    const itemBtns = screen.getAllByRole("button", { name: "체크 박스" });

    itemBtns.forEach((btn) => {
      const img = within(btn).getByRole("img", { name: "체크 박스" });
      expect(img).toHaveAttribute("src", "enabledCheck.svg");
    });
  });

  it("전체선택 버튼을 클릭하면 모두 해제되어야 한다", async () => {
    const user = userEvent.setup();
    const allBtn = screen.getByLabelText("전체선택");
    await user.click(allBtn);

    const allImg = within(allBtn).getByRole("img", { name: "체크 박스" });
    expect(allImg).toHaveAttribute("src", "disabledCheck.svg");

    const itemBtns = screen.getAllByRole("button", { name: "체크 박스" });
    itemBtns.forEach((btn) => {
      const img = within(btn).getByRole("img", { name: "체크 박스" });
      expect(img).toHaveAttribute("src", "disabledCheck.svg");
    });
  });

  it("다시 클릭하면 모두 선택으로 돌아와야 한다", async () => {
    const user = userEvent.setup();
    const allBtn = screen.getByLabelText("전체선택");
    await user.click(allBtn);
    await user.click(allBtn);

    const allImg = within(allBtn).getByRole("img", { name: "체크 박스" });
    expect(allImg).toHaveAttribute("src", "enabledCheck.svg");

    const itemBtns = screen.getAllByRole("button", { name: "체크 박스" });
    itemBtns.forEach((btn) => {
      const img = within(btn).getByRole("img", { name: "체크 박스" });
      expect(img).toHaveAttribute("src", "enabledCheck.svg");
    });
  });
});
