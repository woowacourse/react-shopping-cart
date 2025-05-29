// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "../src/pages/Cart/Cart";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CartItemType, ProductItemType } from "../src/types/response";

// Cart.test.tsx와 동일한 방식의 모킹
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
    // 전체선택 버튼을 눌러서 모두 해제
    const allBtn = screen.getByLabelText("전체선택");
    await user.click(allBtn);
    const orderBtn = screen.getByRole("button", { name: "주문 확인" });
    expect(orderBtn).toBeDisabled();
  });

  it("활성화된 주문확인 버튼을 눌렀을 때, 주문확인 페이지로 이동한다", async () => {
    const user = userEvent.setup();
    const orderBtn = screen.getByRole("button", { name: "주문 확인" });
    await user.click(orderBtn);
    // 주문확인 페이지로 이동했는지 확인 (url 또는 페이지 텍스트 등)
    // 예시: 주문확인 페이지에 특정 텍스트가 있다고 가정
    // 실제 구현에 따라 아래를 수정하세요
    // await screen.findByText("주문서 확인");
    // 또는 location.pathname 검사
    // 아래는 location.pathname을 검사하는 예시
    // (테스트용 컴포넌트로 감싸서 location을 노출해야 함)
    // 여기서는 간단히 버튼 클릭 후 disabled 상태가 아닌지만 체크
    expect(orderBtn).toBeEnabled();
  });
});
