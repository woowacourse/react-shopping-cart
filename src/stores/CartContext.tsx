import { createContext, useContext, useReducer } from "react";
import { ResponseCartItem } from "../types/types";
import { CartAction, cartReducer, initialState } from "./CartReducer";

const CartContext = createContext<ResponseCartItem[] | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(
  null
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === null) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
