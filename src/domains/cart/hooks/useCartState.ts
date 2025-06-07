import { useContext, useMemo } from "react";
import { CartStateContext } from "../contexts/CartContext";
import { State } from "../types/cartState";

export function useCartState() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error("useCartState must be used within CartProvider");

  return { ...state, cartItemCount: state.items.length };
}

export function useCartSelector<T>(selector: (state: State) => T): T {
  const state = useCartState();
  return useMemo(() => selector(state), [state, selector]);
}
