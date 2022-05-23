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
    getCart: (targetId: string): CartType | undefined => {
      return cartList.data.find(({ id }) => id === targetId);
    },
    createNewCart: (productId: number) => {
      const cart: CartType = {
        productId,
        stock: 1,
        isChecked: false,
        id: new Date().toString(),
      };
      dispatch({ type: CartActionType.POST_CART_SUCCESS, payload: cart });
    },
    getCartList: () => {
      dispatch({ type: CartActionType.GET_CART_LIST });
    },
    changeCartStock: (targetId: string, stockChanged: number) => {
      dispatch({
        type: CartActionType.PATCH_CART_STOCK,
        payload: { targetId, stockChanged },
      });
    },
    changeCartChecked: (targetId: string, isChecked: boolean) => {
      dispatch({
        type: CartActionType.PATCH_CART_CHECK,
        payload: { targetId, isChecked },
      });
    },
    isAllChecked: cartList.data.every((cart) => cart.isChecked),
    changeAllCartChecked: (isChecked: boolean) => {
      dispatch({
        type: CartActionType.PATCH_CART_ALL_CHECK,
        payload: isChecked,
      });
    },
  };
};

export default useCart;
