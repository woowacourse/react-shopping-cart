import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren, useContext, useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { getCartItems } from "../apis/getCartItems";
import { CartDispatchContext, CartProvider } from "../contexts/CartContext";
import { useCartState } from "../hooks/useCartState";
import { ToastProvider } from "../../../features/toast/ToastContext";
import useCartToggle from "../hooks/useCartToggle";
import { CartItemWithSelection } from "../types/response";
import { CART_ACTION_TYPES } from "../types/cartAction";

jest.mock("../../../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/getCartItems");

const mockCartItems = [
  {
    id: 101,
    quantity: 1,
    selected: true,
    product: {
      id: 1,
      name: "유기농 바나나",
      price: 4500,
      imageUrl: "https://banana.jpg",
      category: "식료품",
      stock: 3,
    },
  },
  {
    id: 102,
    quantity: 2,
    selected: true,
    product: {
      id: 2,
      name: "신선한 사과 1kg",
      price: 7900,
      imageUrl: "https://apple.jpg",
      category: "식료품",
      stock: 5,
    },
  },
];

const CartInitializer = ({ items }: { items: CartItemWithSelection[] }) => {
  const dispatch = useContext(CartDispatchContext);

  useEffect(() => {
    if (dispatch) dispatch({ type: CART_ACTION_TYPES.REPLACE_ITEMS, items });
  }, [dispatch, items]);

  return null;
};

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>
      <CartProvider>
        <CartInitializer items={mockCartItems} />
        {children}
      </CartProvider>
    </ToastProvider>
  </MemoryRouter>
);

describe("useCartToggle 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  it("toggleAllSelected 함수 호출 시 모든 상품의 선택 상태를 토글한다", async () => {
    const { result } = renderHook(
      () => ({
        toggle: useCartToggle(),
        state: useCartState(),
      }),
      { wrapper }
    );

    expect(result.current.state.items).toBe(mockCartItems);
    expect(result.current.state.cartItemCount).toBe(mockCartItems.length);
    expect(result.current.state.allSelected).toBe(true);

    act(() => {
      result.current.toggle.toggleAllSelected();
    });

    expect(result.current.state.allSelected).toBe(false);
    result.current.state.items.forEach((item) => {
      expect(item.selected).toBe(false);
    });

    act(() => {
      result.current.toggle.toggleAllSelected();
    });

    expect(result.current.state.allSelected).toBe(true);
    result.current.state.items.forEach((item) => {
      expect(item.selected).toBe(true);
    });
  });

  it("toggleItemSelected 함수 호출 시 특정 상품의 선택 상태만 토글한다", async () => {
    const { result } = renderHook(
      () => ({
        toggle: useCartToggle(),
        state: useCartState(),
      }),
      { wrapper }
    );

    expect(result.current.state.items).toBe(mockCartItems);
    expect(result.current.state.cartItemCount).toBe(mockCartItems.length);
    expect(result.current.state.allSelected).toBe(true);

    act(() => {
      result.current.toggle.toggleItemSelected(101);
    });

    expect(
      result.current.state.items.find((item) => item.id === 101)?.selected
    ).toBe(false);
    expect(result.current.state.allSelected).toBe(false);

    act(() => {
      result.current.toggle.toggleItemSelected(101);
    });

    expect(
      result.current.state.items.find((item) => item.id === 101)?.selected
    ).toBe(true);
    expect(result.current.state.allSelected).toBe(true);
  });
});
