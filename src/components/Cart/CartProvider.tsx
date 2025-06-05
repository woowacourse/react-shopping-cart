import { ReactNode } from "react";
import { CartProvider as BaseCartProvider } from "./CartContext";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";

import useLocalStorage from "@/hooks/Cart/useLocalStorage";
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
    selectedCartIds,
    handleSelectCartItem,
    handleSelectAllCartItems,
    selectedCartItemsLength,
    isAllSelected,
    selectedCartItems,
    setSelectedCartIds,
  } = useCartSelection(cartItemsData);

  useLocalStorage({ cartItemsData, selectedCartIds, setSelectedCartIds });

  const { subtotalPrice } = useCalculateOrder(cartItemsData, selectedCartIds);

  const contextValue = {
    cartItemsData,
    cartFetchLoading,
    handleCartItemQuantity,
    handleDeleteCartItem,
    selectedCartIds,
    handleSelectCartItem,
    handleSelectAllCartItems,
    handleOrderCartItem,
    selectedCartItemsLength,
    isAllSelected,
    selectedCartItems,
    subtotalPrice,
    onNext: onNext ?? (() => {}),
  };

  return <BaseCartProvider value={contextValue}>{children}</BaseCartProvider>;
};
