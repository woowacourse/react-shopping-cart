import { ReactNode } from "react";
import { CartProvider as BaseCartProvider } from "./CartContext";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { useCalculateOrder } from "@/hooks/useCalculateOrder";
import useLocalStorage from "@/hooks/Cart/useLocalStorage";

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
    selectedCartItemsLength,
    isAllSelected,
    selectedCartItems,
    subtotalPrice,
    onNext: onNext ?? (() => {}),
  };

  return <BaseCartProvider value={contextValue}>{children}</BaseCartProvider>;
};
