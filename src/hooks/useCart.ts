import { useSelector } from "react-redux";
import { RootState } from "../modules";
import { Cart, CartAction, CartActionType } from "../modules/cart/type";
import { useAppDispatch } from "./useAppDispatch";

const useCartItem = (targetId: string) => {
  const cartList = useSelector<RootState, Cart>((state) => state.cart);

  const dispatch = useAppDispatch<CartAction>();

  return {
    getCart: () => {
      return cartList.data.find(({ id }) => id === targetId);
    },
    changeCartStock: (stockChanged: number) => {
      dispatch({
        type: CartActionType.PATCH_CART_STOCK,
        payload: { targetId, stockChanged },
      });
    },
    changeCartChecked: (isChecked: boolean) => {
      dispatch({
        type: CartActionType.PATCH_CART_CHECK,
        payload: { targetId, isChecked },
      });
    },
    deleteCart: () => {
      dispatch({
        type: CartActionType.DELETE_CART,
        payload: targetId,
      });
    },
  };
};

export default useCartItem;
