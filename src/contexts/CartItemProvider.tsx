import { createContext, useEffect, useState } from "react";
import { CartItem } from "../types/type";
import cartItemsApi from "../apis/cartItems";

interface CartItemContext {
  cartItems: CartItem[];
  isLoading: boolean;
  errorMessage: string;
  fetchCartItem: () => Promise<void>;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function fetchCartItem() {
    try {
      setIsLoading(true);
      const data = await cartItemsApi.get();
      setCartItems(data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Fail to Fetch Error");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartItem();
    };

    fetchData();
  }, []);

  return (
    <CartItemContext.Provider
      value={{ cartItems, isLoading, errorMessage, fetchCartItem }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
