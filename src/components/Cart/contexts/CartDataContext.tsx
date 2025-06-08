import { PropsWithChildren, createContext, useContext, useState } from "react";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import { CartItem } from "@/type/CartItem";

interface CartDataContextValue {
  cartItemsData: CartItem[];
  cartFetchLoading: boolean;
  handleCartItemQuantity: (params: {
    id: string;
    quantity: number;
  }) => Promise<void>;
  handleDeleteCartItem: (id: string) => Promise<void>;
  handleOrderCartItem: (cartItems: CartItem[]) => Promise<void>;
  isItemLoading: (id: string) => boolean;
}

const CartDataContext = createContext<CartDataContextValue | null>(null);

export const useCartDataContext = () => {
  const context = useContext(CartDataContext);
  if (!context) {
    throw new Error("useCartDataContext must be used within CartDataProvider");
  }
  return context;
};

interface CartDataProviderProps extends PropsWithChildren {}

export const CartDataProvider = ({ children }: CartDataProviderProps) => {
  const [loadingItemIds, setLoadingItemIds] = useState<Set<string>>(new Set());

  const {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity: originalHandleCartItemQuantity,
    handleDeleteCartItem: originalHandleDeleteCartItem,
    handleOrderCartItem,
  } = useShoppingCart();

  // 로딩 상태 관리를 포함한 핸들러들
  const handleCartItemQuantity = async (params: {
    id: string;
    quantity: number;
  }) => {
    setLoadingItemIds((prev) => new Set(prev).add(params.id));
    try {
      await originalHandleCartItemQuantity(params);
    } finally {
      setLoadingItemIds((prev) => {
        const next = new Set(prev);
        next.delete(params.id);
        return next;
      });
    }
  };

  const handleDeleteCartItem = async (id: string) => {
    setLoadingItemIds((prev) => new Set(prev).add(id));
    try {
      await originalHandleDeleteCartItem(id);
    } finally {
      setLoadingItemIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const isItemLoading = (id: string) => loadingItemIds.has(id);

  const contextValue: CartDataContextValue = {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity,
    handleDeleteCartItem,
    handleOrderCartItem,
    isItemLoading,
  };

  return (
    <CartDataContext.Provider value={contextValue}>
      {children}
    </CartDataContext.Provider>
  );
};
