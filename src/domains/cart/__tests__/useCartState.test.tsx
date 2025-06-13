import { renderHook } from "@testing-library/react";
import { PropsWithChildren, useContext, useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../../../features/toast/ToastContext";
import { getCartItems } from "../apis/getCartItems";
import { CartDispatchContext, CartProvider } from "../contexts/CartContext";
import { useCartState } from "../hooks/useCartState";
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

const TestWrapper = ({
  children,
  items = mockCartItems,
}: PropsWithChildren<{ items?: CartItemWithSelection[] }>) => {
  (getCartItems as jest.Mock).mockResolvedValue(items);

  return (
    <MemoryRouter>
      <ToastProvider>
        <CartProvider>
          <CartInitializer items={items} />
          {children}
        </CartProvider>
      </ToastProvider>
    </MemoryRouter>
  );
};

describe("useCartState 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("장바구니가 비어있는 경우 상품 데이터가 빈 값으로 초기화된다", async () => {
    const { result } = renderHook(() => useCartState(), {
      wrapper: ({ children }) => (
        <TestWrapper items={[]}>{children}</TestWrapper>
      ),
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.cartItemCount).toBe(0);
  });

  it("장바구니 상품 상태를 올바르게 반환한다", async () => {
    const { result } = renderHook(() => useCartState(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(result.current.items).toHaveLength(mockCartItems.length);
    expect(result.current.cartItemCount).toBe(mockCartItems.length);
    expect(result.current.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 101 }),
        expect.objectContaining({ id: 102 }),
      ])
    );
  });

  it("장바구니 전체 선택 여부 상태를 올바르게 반환한다", async () => {
    const { result } = renderHook(() => useCartState(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(result.current.items).toHaveLength(mockCartItems.length);
    expect(result.current.cartItemCount).toBe(mockCartItems.length);
    expect(result.current.allSelected).toBe(true);
  });
});
