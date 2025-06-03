import { useCartItemContext } from "../src/contexts/useCartItemContext";
import { vi } from "vitest";
import { CartItem } from "../src/types/type";
import CartItemCardList from "../src/components/CartItemList/CartItemList";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItemPage from "../src/pages/CartItemPage";
import { MemoryRouter } from "react-router";

vi.mock("../src/contexts/useCartItemContext", () => ({
  useCartItemContext: vi.fn(),
}));

describe("CartItemCardList 컴포넌트", () => {
  const mockCartItems: CartItem[] = [
    {
      id: 1,
      product: {
        id: 101,
        name: "콜라",
        price: 1500,
        category: "식료품",
        imageUrl: "https://example.com/cola.jpg",
      },
      quantity: 2,
      isSelected: true,
    },
    {
      id: 2,
      product: {
        id: 102,
        name: "사이다",
        price: 1500,
        category: "식료품",
        imageUrl: "https://example.com/cola.jpg",
      },
      quantity: 2,
      isSelected: true,
    },
  ];

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("전체선택 버튼을 클릭하면 handleSelectedItem이 호출된다", () => {
    const mockHandleSelectedItem = vi.fn();
    const mockSetCartItems = vi.fn();
    const mockSelectedItem = new Set([1, 2]);

    const mockedUseCartItemContext = vi.mocked(useCartItemContext);
    mockedUseCartItemContext.mockReturnValue({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
      selectedItem: mockSelectedItem,
      handleSelectedItem: mockHandleSelectedItem,
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    vi.clearAllMocks();

    fireEvent.click(screen.getByTestId("all-select-toggle"));

    expect(mockHandleSelectedItem).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectedItem).toHaveBeenCalledWith(new Set());
  });

  it("아무것도 선택되지 않은 상태에서 전체선택 버튼을 클릭하면 모든 아이템이 선택된다", () => {
    const mockHandleSelectedItem = vi.fn();
    const mockSetCartItems = vi.fn();
    const mockSelectedItem = new Set();

    const mockedUseCartItemContext = vi.mocked(useCartItemContext);
    mockedUseCartItemContext.mockReturnValue({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
      selectedItem: mockSelectedItem,
      handleSelectedItem: mockHandleSelectedItem,
      isLoading: false,
      fetchError: "",
    });

    render(<CartItemCardList />);

    vi.clearAllMocks();

    fireEvent.click(screen.getByTestId("all-select-toggle"));

    expect(mockHandleSelectedItem).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectedItem).toHaveBeenCalledWith(new Set([1, 2]));
  });

  it("주문금액이 10만원 미만이면 배송비는 3000원이여야 한다.", () => {
    const mockHandleSelectedItem = vi.fn();
    const mockSetCartItems = vi.fn();

    const mockedUseCartItemContext = vi.mocked(useCartItemContext);
    mockedUseCartItemContext.mockReturnValue({
      cartItems: mockCartItems,
      setCartItems: mockSetCartItems,
      selectedItem: new Set([1, 2]),
      handleSelectedItem: mockHandleSelectedItem,
      isLoading: false,
      fetchError: "",
    });

    render(
      <MemoryRouter>
        <CartItemPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("shipping-fee").textContent).toBe("3,000원");
  });
});
