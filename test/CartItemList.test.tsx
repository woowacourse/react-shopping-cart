import { vi } from "vitest";
import CartItemCardList from "../src/components/CartItemList/CartItemList";
import { fireEvent, render, screen } from "@testing-library/react";
import { useCartItemContext } from "../src/contexts/CartItemContext";
import { defaultMockCartItems } from "./utils/mockCartItems";

const mockHandleSelectedItems = vi.fn();

vi.mock("../src/contexts/CartItemContext", async () => {
  const actual = vi.importActual;
  typeof import("../src/contexts/CartItemContext") >
    "../src/contexts/CartItemContext";

  return {
    ...actual,
    useCartItemContext: vi.fn(),
  };
});

const mockUseCartItemContext = vi.mocked(useCartItemContext);

describe("CartItemCardList 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("아무것도 선택되지 않은 상태에서 전체선택 버튼을 클릭하면 모든 아이템이 선택된다", () => {
    mockUseCartItemContext.mockReturnValue({
      handleSelectedItems: mockHandleSelectedItems,
      cartItems: defaultMockCartItems,
      selectedItems: new Set(),
      setCartItems: vi.fn(),
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    const allSelectToggle = screen.getByTestId("all-select-toggle");
    fireEvent.click(allSelectToggle);

    expect(mockHandleSelectedItems).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectedItems).toHaveBeenCalledWith(new Set([1, 2]));
  });

  it("모든 아이템이 선택된 상태에서 전체선택 버튼을 클릭하면 모든 선택이 해제된다", () => {
    mockUseCartItemContext.mockReturnValue({
      handleSelectedItems: mockHandleSelectedItems,
      cartItems: defaultMockCartItems,
      selectedItems: new Set([1, 2]),
      setCartItems: vi.fn(),
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    const allSelectToggle = screen.getByTestId("all-select-toggle");
    fireEvent.click(allSelectToggle);

    expect(mockHandleSelectedItems).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectedItems).toHaveBeenCalledWith(new Set());
  });
});
