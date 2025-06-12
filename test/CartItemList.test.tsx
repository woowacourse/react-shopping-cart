import { vi } from "vitest";
import CartItemCardList from "../src/components/CartItemList/CartItemList";
import { fireEvent, render, screen } from "@testing-library/react";
import { useCartItemContext } from "../src/contexts/CartItemContext";
import { defaultMockCartItems } from "./utils/mockCartItems";

const mockSelectAllItems = vi.fn();
const mockClearSelectedItems = vi.fn();
const mockToggleSelectedItem = vi.fn();

vi.mock("../src/contexts/CartItemContext", async () => {
  const actual = await vi.importActual("../src/contexts/CartItemContext");

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
      cartItems: defaultMockCartItems,
      selectedItems: new Set(),
      selectAllItems: mockSelectAllItems,
      clearSelectedItems: mockClearSelectedItems,
      toggleSelectedItem: mockToggleSelectedItem,
      addSelectedItem: vi.fn(),
      removeSelectedItem: vi.fn(),
      setCartItems: vi.fn(),
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    const allSelectToggle = screen.getByTestId("all-select-toggle");
    fireEvent.click(allSelectToggle);

    expect(mockSelectAllItems).toHaveBeenCalledTimes(1);
  });

  it("모든 아이템이 선택된 상태에서 전체선택 버튼을 클릭하면 모든 선택이 해제된다", () => {
    mockUseCartItemContext.mockReturnValue({
      cartItems: defaultMockCartItems,
      selectedItems: new Set([1, 2]),
      selectAllItems: mockSelectAllItems,
      clearSelectedItems: mockClearSelectedItems,
      toggleSelectedItem: mockToggleSelectedItem,
      addSelectedItem: vi.fn(),
      removeSelectedItem: vi.fn(),
      setCartItems: vi.fn(),
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    const allSelectToggle = screen.getByTestId("all-select-toggle");
    fireEvent.click(allSelectToggle);

    expect(mockClearSelectedItems).toHaveBeenCalledTimes(1);
  });
});
