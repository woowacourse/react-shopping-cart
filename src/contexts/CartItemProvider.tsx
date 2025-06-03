import { createContext, useState } from "react";
import { CartItem } from "../types/type";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";
import { useFetchCartItems } from "../hooks/useFetchCartItems";

interface CartItemContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedItem: Set<unknown>;
  handleSelectedItem: (newSet: Set<unknown>) => void;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
  isLoading: boolean;
  fetchError: string;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState(new Set());

  const { isLoading, fetchError } = useFetchCartItems(setCartItems);

  const handleSelectedItem = (newSet: Set<unknown>) => {
    return setSelectedItem(newSet);
  };

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
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
        setCartItems,
        selectedItem,
        handleSelectedItem,
        orderPrice,
        shippingFee,
        totalPrice,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
