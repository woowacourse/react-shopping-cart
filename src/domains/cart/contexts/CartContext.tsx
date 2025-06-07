import { createContext, PropsWithChildren, useReducer } from "react";
import { Action, State } from "../types/reducer";
import cartReducer from "./cartReducer";

// const FREE_SHIPPING_THRESHOLD = 100_000;
// const DEFAULT_SHIPPING_FEE = 3_000;

// interface CartContextType {
//   cartItems: CartItemWithSelection[];
//   orderItems: CartItemWithSelection[];

//   deleteItem: (cartId: number) => Promise<void>;
//   updateItemQuantity: (cartId: number, quantity: number) => Promise<void>;

//   allSelected: boolean;
//   toggleAllSelected: () => void;
//   toggleItemSelected: (cartId: number) => void;

//   cartItemCount: number;
//   orderItemCount: number;
//   hasSelectedItem: boolean;

//   orderQuantity: number;
//   orderPrice: number;
//   shippingFee: number;
//   totalPrice: number;
// }

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
    // <CartContext.Provider
    //   value={{
    //     cartItems: state.items,
    //     orderItems,

    //     deleteItem,
    //     updateItemQuantity,

    //     allSelected: state.allSelected,
    //     toggleAllSelected,
    //     toggleItemSelected,

    //     cartItemCount: state.items.length,
    //     orderItemCount: orderItems.length,
    //     hasSelectedItem: orderItems.length > 0,

    //     orderQuantity,
    //     orderPrice,
    //     shippingFee,
    //     totalPrice,
    //   }}
    // >
    //   {children}
    // </CartContext.Provider>
  );
};
