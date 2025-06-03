import { vi } from "vitest";
import CartItemCardList from "../src/components/CartItemList/CartItemList";
import { fireEvent, render, screen } from "@testing-library/react";

import CartItemPage from "../src/pages/CartItemPage";
import { MemoryRouter } from "react-router";
import { setupMockContext } from "./utils/setupMockContext";

vi.mock("../src/contexts/useCartItemContext", () => ({
  useCartItemContext: vi.fn(),
}));

describe("CartItemCardList 컴포넌트", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("전체선택 버튼을 클릭하면 handleSelectedItem이 호출된다", () => {
    const { handleSelectedItem } = setupMockContext({
      selectedItem: new Set([1, 2]),
    });

    render(<CartItemCardList />);

    vi.clearAllMocks();
    fireEvent.click(screen.getByTestId("all-select-toggle"));

    expect(handleSelectedItem).toHaveBeenCalledTimes(1);
    expect(handleSelectedItem).toHaveBeenCalledWith(new Set());
  });

  it("아무것도 선택되지 않은 상태에서 전체선택 버튼을 클릭하면 모든 아이템이 선택된다", () => {
    const { handleSelectedItem } = setupMockContext({
      selectedItem: new Set(),
    });

    render(<CartItemCardList />);

    vi.clearAllMocks();
    fireEvent.click(screen.getByTestId("all-select-toggle"));

    expect(handleSelectedItem).toHaveBeenCalledTimes(1);
    expect(handleSelectedItem).toHaveBeenCalledWith(new Set([1, 2]));
  });

  it("주문금액이 10만원 미만이면 배송비는 3000원이여야 한다.", () => {
    setupMockContext({ selectedItem: new Set([1, 2]) });

    render(
      <MemoryRouter>
        <CartItemPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("shipping-fee").textContent).toBe("3,000원");
  });
});
