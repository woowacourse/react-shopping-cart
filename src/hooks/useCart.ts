import { useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  Cart,
  CartAction,
  CartActionType,
  PatchCartStock,
} from "../modules/cart/type";
import { CartType } from "../types/cart";
import { useAppDispatch } from "./useAppDispatch";

const useCart = () => {
  const cartList = useSelector<RootState, Cart>((state) => state.cart);

  const dispatch = useAppDispatch<CartAction>();

  return {
    cartData: cartList.data,
    isAllChecked: cartList.data.every((cart) => cart.isChecked),
    checkedItemAmount: cartList.data.filter((cart) => cart.isChecked).length,
    totalPrice: cartList.data
      .filter((cart) => cart.isChecked)
      .reduce((prev, acc) => prev + acc.price * acc.stock, 0),

    getCart: (targetId: string) => {
      return cartList.data.find(({ id }) => id === targetId);
    },
    createNewCart: (productId: number, price: number) => {
      const targetCart = cartList.data.find(
        (cart) => cart.productId === productId
      );

      if (targetCart) {
        const { id, stock } = targetCart;
        return dispatch<PatchCartStock>({
          type: CartActionType.PATCH_CART_STOCK,
          payload: { targetId: id, stockChanged: stock + 1 },
        });
      }

      const cart: CartType = {
        productId,
        stock: 1,
        isChecked: false,
        id: new Date().toString(),
        price,
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
    changeAllCartChecked: (isChecked: boolean) => {
      dispatch({
        type: CartActionType.PATCH_CART_ALL_CHECK,
        payload: isChecked,
      });
    },
    deleteCart: (targetId: string) => {
      dispatch({
        type: CartActionType.DELETE_CART,
        payload: targetId,
      });
    },
    deleteAllCheckedCart: () => {
      dispatch({
        type: CartActionType.DELETE_ALL_CHECKED_CART,
      });
    },
  };
};

export default useCart;
