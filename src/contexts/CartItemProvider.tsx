import { createContext, useEffect, useState } from "react";
import { CartItem } from "../types/type";
import cartItemsApi from "../apis/cartItems";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";

interface CartItemContext {
  cartItems: CartItem[];
  isLoading: boolean;
  errorMessage: string;
  fetchCartItems: () => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
  selectedItem: Set<unknown>;
  handleSelectedItem: (newSet: Set<unknown>) => void;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState(new Set());

  const handleSelectedItem = (newSet: Set<unknown>) => {
    return setSelectedItem(newSet);
  };

  async function fetchCartItems() {
    try {
      const data = await cartItemsApi.get();
      setCartItems(data);
    } catch (error) {
      setErrorMessage("Fail to Fetch Error");
    }
  }

  async function deleteCartItem(cartItemId: number) {
    try {
      await cartItemsApi.delete(cartItemId);
      await fetchCartItems();
    } catch (error) {
      setErrorMessage("Fail to Delete Error");
    }
  }

  async function updateCartItem(cartItemId: number, quantity: number) {
    try {
      await cartItemsApi.patch(cartItemId, quantity);
      await fetchCartItems();
    } catch (error) {
      setErrorMessage("Fail to Update Error");
    }
  }

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const shippingFee = orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;

  const totalPrice = shippingFee + orderPrice;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await fetchCartItems();
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        isLoading,
        errorMessage,
        fetchCartItems,
        deleteCartItem,
        updateCartItem,
        orderPrice,
        shippingFee,
        totalPrice,
        selectedItem,
        handleSelectedItem,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
