import { createContext, useEffect, useState } from "react";
import { CartItem } from "../types/type";
import cartItemsApi from "../apis/cartItems";

interface CartItemContext {
  cartItems: CartItem[];
  isLoading: boolean;
  errorMessage: string;
  fetchCartItems: () => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function fetchCartItems() {
    try {
      setIsLoading(true);
      const data = await cartItemsApi.get();
      setCartItems(data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Fail to Fetch Error");
    }
  }

  async function deleteCartItem(cartItemId: number) {
    try {
      setIsLoading(true);
      await cartItemsApi.delete(cartItemId);
      await fetchCartItems();
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Fail to Delete Error");
    }
  }

  async function updateCartItem(cartItemId: number, quantity: number) {
    try {
      setIsLoading(true);
      await cartItemsApi.patch(cartItemId, quantity);
      await fetchCartItems();
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Fail to Update Error");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartItems();
    };

    fetchData();
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
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
