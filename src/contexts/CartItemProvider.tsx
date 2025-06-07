import { createContext } from "react";
import { CartItem } from "../types/type";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";
import { LoadingStatus, useCartItems } from "../hooks/useCartItems";
import { useSelected } from "../hooks/useSelected";
interface CartItemContext {
  cartItems: CartItem[];
  loadingStatus: LoadingStatus;
  errorMessage: string;
  fetchCartItems: () => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
  selectedItemIds: Set<number>;
  toggleSelectedItemId: (id: number) => void;
  replaceSelectedItemIds: (ids: number[]) => void;
  handleLoadingStatus: (status: LoadingStatus) => void;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const {
    cartItems,
    fetchCartItems,
    deleteCartItem,
    updateCartItem,
    loadingStatus,
    errorMessage,
    handleLoadingStatus,
  } = useCartItems();
  const { selectedItemIds, toggleSelectedItemId, replaceSelectedItemIds } =
    useSelected({ enableStorage: true, storageKey: "selectedCartItemIds" });

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItemIds.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const shippingFee = orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;

  const totalPrice = shippingFee + orderPrice;

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        loadingStatus,
        errorMessage,
        fetchCartItems,
        deleteCartItem,
        updateCartItem,
        orderPrice,
        shippingFee,
        totalPrice,
        selectedItemIds,
        toggleSelectedItemId,
        replaceSelectedItemIds,
        handleLoadingStatus,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
