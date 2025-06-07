import { createContext, PropsWithChildren, useReducer } from "react";
import { Action, State } from "../types/reducer";
import cartReducer from "./cartReducer";

export const CartStateContext = createContext<State | null>(null);
export const CartDispatchContext = createContext<React.Dispatch<Action> | null>(
  null
);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    allSelected: false,
  });

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
