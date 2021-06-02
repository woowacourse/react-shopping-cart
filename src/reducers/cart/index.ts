import { CartItem } from "../../interface";
import { CartActionType, cartActionType } from "../../actions/cart";

const initialState: CartItem[] = [];

const cartReducer = (state: CartItem[] = initialState, action: CartActionType) => {
  switch (action.type) {
    case cartActionType.get.success:
      return action.payload;

    default:
      return state;
  }
};

export default cartReducer;
export { initialState };
