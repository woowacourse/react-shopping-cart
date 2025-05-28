import { createContext, useReducer } from "react";
import { CartDataType } from "../types/cartDataType";
import { CartAction, cartReducer, initialState } from "./CartReducer";

const CartContext = createContext<CartDataType[] | null>(null);
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
export default CartContext;
