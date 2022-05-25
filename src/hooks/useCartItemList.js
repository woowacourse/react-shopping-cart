/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ACTIONS } from "../store/actions";

import { fetchData } from "../apiRequest";
import {
  API_SERVER,
  REQUEST_METHOD,
  ACTION_SUCCESS_MESSAGE,
} from "./../constants";

const cartUrl = `${API_SERVER.BASE_URL}${API_SERVER.PATH.CART}`;

const requestGetCartItemList = () => fetchData(REQUEST_METHOD.GET, cartUrl);
const requestPostCartItem = (productList) =>
  fetchData(REQUEST_METHOD.POST, cartUrl, { productList });
const requestDeleteCartItem = (productIdList) =>
  fetchData(REQUEST_METHOD.DELETE, cartUrl, { productIdList });

export const useCartItemList = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: cartItemList } = useSelector((state) => state.cartReducer);

  const getCartItemList = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const newCartItemList = await requestGetCartItemList();
      dispatch({ type: ACTIONS.SET_CART_ITEM_LIST, payload: newCartItemList });
    } catch (err) {
      setErrorMessage(err.message);
    }

    setIsLoading(false);
  };

  const addCartItemQuantity = async ({ id, quantity }) => {
    try {
      const newCartItemList = await requestPostCartItem([{ id, quantity }]);
      dispatch({ type: ACTIONS.SET_CART_ITEM_LIST, payload: newCartItemList });
    } catch (err) {
      alert(err.message);
    }
  };

  const addCartItemQuantityWithSuccessMessage = async ({ id, quantity }) => {
    try {
      const newCartItemList = await requestPostCartItem([{ id, quantity }]);
      dispatch({ type: ACTIONS.SET_CART_ITEM_LIST, payload: newCartItemList });
    } catch (err) {
      alert(err.message);
      return;
    }

    alert(
      ACTION_SUCCESS_MESSAGE.POST_CART_ITEM_SUCCESS_WITH_QUANTITY(quantity)
    );
  };

  const deleteCartItemByIdList = async (cartItemIdList) => {
    try {
      const newCartItemList = await requestDeleteCartItem(cartItemIdList);
      dispatch({ type: ACTIONS.SET_CART_ITEM_LIST, payload: newCartItemList });
    } catch (err) {
      alert(err.message);
      return;
    }

    alert(ACTION_SUCCESS_MESSAGE.DELETE_CART_ITEM_SUCCESS);
  };

  return {
    cartItemList,
    isLoading,
    errorMessage,
    getCartItemList,
    addCartItemQuantity,
    addCartItemQuantityWithSuccessMessage,
    deleteCartItemByIdList,
  };
};
