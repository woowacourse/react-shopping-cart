/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartItemList,
  postCartItem,
  deleteCartItem,
} from "../store/actions";
import { PRODUCT_QUANTITY_CONDITION } from "../constants";

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
    if (!id || !quantity) return;
    if (quantity > PRODUCT_QUANTITY_CONDITION.MAX) return;
    if (quantity < PRODUCT_QUANTITY_CONDITION.MIN) return;

    dispatch(
      postCartItem(
        [{ id, quantity }],
        `${quantity}개의 상품을 장바구니에 담았습니다.`
      )
    );
  };

  const updateCartItemQuantityWithAlert = ({ id, quantity }) => {
    if (!id || !quantity) return;
    if (quantity > PRODUCT_QUANTITY_CONDITION.MAX) {
      alert(
        `장바구니에는 최대 ${PRODUCT_QUANTITY_CONDITION.MAX}개까지 담을 수 있습니다.`
      );
      return;
    }
    if (quantity < PRODUCT_QUANTITY_CONDITION.MIN) {
      alert(
        `장바구니에는 최소 ${PRODUCT_QUANTITY_CONDITION.MIN}개의 상품을 담아야합니다.`
      );
      return;
    }
    dispatch(
      postCartItem(
        [{ id, quantity }],
        `${quantity}개의 상품을 장바구니에 담았습니다.`
      )
    );
  };

  const deleteCartItemByIdList = (cartItemIdList) => {
    dispatch(
      deleteCartItem(cartItemIdList, `장바구니에서 상품을 삭제했습니다.`)
    );
  };

  return {
    cartItemList,
    isLoading,
    errorMessage,
    updateCartItemQuantity,
    updateCartItemQuantityWithAlert,
    deleteCartItemByIdList,
  };
};
