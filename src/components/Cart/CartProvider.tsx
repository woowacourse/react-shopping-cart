import { PropsWithChildren, createContext, useContext, useState } from "react";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { useCalculateOrder } from "@/hooks/Cart/useCalculateOrder";
import { CartItem } from "@/type/CartItem";

interface CartContextValue {
  cartItemsData: CartItem[];
  cartFetchLoading: boolean;

  handleCartItemQuantity: (params: {
    id: string;
    quantity: number;
  }) => Promise<void>;
  handleDeleteCartItem: (id: string) => Promise<void>;
  selectedCartIds: Set<string>;
  handleSelectCartItem: (id: string) => void;
  handleSelectAllCartItems: () => void;
  handleOrderCartItem: (cartItems: CartItem[]) => Promise<void>;
  selectedCartItemsLength: number;
  isAllSelected: boolean;
  selectedCartItems: CartItem[];

  subtotalPrice: number;

  // 로딩 상태 관리
  isItemLoading: (id: string) => boolean;

  onNext: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Cart compound components must be used within Cart.Root");
  }
  return context;
};

interface CartProviderProps extends PropsWithChildren {
  onNext?: () => void;
}

export const CartProvider = ({ children, onNext }: CartProviderProps) => {
  const [loadingItemIds, setLoadingItemIds] = useState<Set<string>>(new Set());

  const {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity: originalHandleCartItemQuantity,
    handleDeleteCartItem: originalHandleDeleteCartItem,
    handleOrderCartItem,
  } = useShoppingCart();

  const {
    selectedIds,
    toggleOne,
    toggleAll,
    selectedItemsLength,
    isAllSelected,
    selectedItems,
  } = useCartSelection(cartItemsData);

  const { subtotalPrice } = useCalculateOrder(cartItemsData, selectedIds);

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

  const contextValue: CartContextValue = {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity,
    handleDeleteCartItem,
    handleOrderCartItem,
    // 선택 관련
    selectedCartIds: selectedIds,
    handleSelectCartItem: toggleOne,
    handleSelectAllCartItems: toggleAll,
    selectedCartItemsLength: selectedItemsLength,
    isAllSelected,
    selectedCartItems: selectedItems,
    // 금액
    subtotalPrice,
    // 로딩 상태
    isItemLoading,
    // 외부 콜백 (예: "다음 단계" 버튼)
    onNext: onNext ?? (() => {}),
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
