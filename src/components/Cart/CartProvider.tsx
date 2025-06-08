import { PropsWithChildren, createContext, useContext } from "react";
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
  const {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity,
    handleDeleteCartItem,
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
    // 외부 콜백 (예: "다음 단계" 버튼)
    onNext: onNext ?? (() => {}),
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
