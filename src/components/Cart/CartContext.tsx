import { createContext, useContext, ReactNode } from "react";
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

interface CartProviderProps {
  children: ReactNode;
  value: CartContextValue;
}

export const CartProvider = ({ children, value }: CartProviderProps) => {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
