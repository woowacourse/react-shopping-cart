/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_SUCCESS_MESSAGE } from "../constants";

import {
  getCartItemList,
  postCartItem,
  deleteCartItem,
} from "../store/actions";

export const useCartItemList = () => {
  const dispatch = useDispatch();

  const {
    data: cartItemList,
    loading: isLoading,
    errorMessage,
  } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(getCartItemList());
  }, []);

  const updateCartItemQuantity = ({ id, quantity }) => {
    dispatch(postCartItem([{ id, quantity }]));
  };

  const updateCartItemQuantityWithSuccessMessage = ({ id, quantity }) => {
    dispatch(
      postCartItem(
        [{ id, quantity }],
        ACTION_SUCCESS_MESSAGE.POST_CART_ITEM_SUCCESS_WITH_QUANTITY(quantity)
      )
    );
  };

  const deleteCartItemByIdList = (cartItemIdList) => {
    dispatch(
      deleteCartItem(
        cartItemIdList,
        ACTION_SUCCESS_MESSAGE.DELETE_CART_ITEM_SUCCESS
      )
    );
  };

  return {
    cartItemList,
    isLoading,
    errorMessage,
    updateCartItemQuantity,
    updateCartItemQuantityWithSuccessMessage,
    deleteCartItemByIdList,
  };
};
