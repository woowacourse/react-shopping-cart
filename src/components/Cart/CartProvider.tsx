import { ReactNode } from "react";
import { CartProvider as BaseCartProvider } from "./CartContext";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { useCalculateOrder } from "@/hooks/Cart/useCalculateOrder";

interface CartProviderProps {
  children: ReactNode;
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

  const contextValue = {
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
    // 외부 콜백 (예: “다음 단계” 버튼)
    onNext: onNext ?? (() => {}),
  };

  return <BaseCartProvider value={contextValue}>{children}</BaseCartProvider>;
};
