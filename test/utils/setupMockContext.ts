import { useCartItemContext } from "../../src/contexts/CartItemContext";
import { CartItem } from "../../src/types/type";
import { vi } from "vitest";

export const mockCartItems: CartItem[] = [
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

export function setupMockContext({
  selectedItem = new Set(),
  handleSelectedItem = vi.fn(),
  setCartItems = vi.fn(),
  isLoading = false,
  fetchError = "",
}: {
  selectedItem?: Set<number>;
  handleSelectedItem?: ReturnType<typeof vi.fn>;
  setCartItems?: ReturnType<typeof vi.fn>;
  isLoading?: boolean;
  fetchError?: string;
} = {}) {
  const mockedUseCartItemContext = vi.mocked(useCartItemContext);
  mockedUseCartItemContext.mockReturnValue({
    cartItems: mockCartItems,
    setCartItems,
    selectedItem,
    handleSelectedItem,
    isLoading,
    fetchError,
  });

  return { handleSelectedItem, setCartItems };
}
