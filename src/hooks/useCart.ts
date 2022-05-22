import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { CartAction, CartActionType } from "../modules/cart/type";
import { CartType } from "../types/cart";
import { useAppDispatch } from "./useAppDispatch";

const useCart = () => {
  const cartList = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch<CartAction>();

  return {
    cartData: cartList.data,
    createNewCart: (productId: number) => {
      const cart: CartType = {
        productId,
        stock: 1,
        isChecked: false,
        id: new Date().toString(),
      };
      dispatch({ type: CartActionType.POST_CART_SUCCESS, payload: cart });
    },
    getCart: () => {
      dispatch({ type: CartActionType.GET_CART_LIST });
    },
  };
};

export default useCart;
