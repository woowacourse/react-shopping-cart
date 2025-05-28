import { useState, useEffect, useReducer } from "react";

import fetchCartItems from "../api/fetchCartItemList";
import CartItem from "../types/CartItem";

const INIT_STATE = {
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isFail: false,
};

const ACTION_TYPE = {
  FETCH_LOADING: "FETCH_LOADING",
  FETCH_FETCHING: "FETCH_FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",
};

const reducer = (state: typeof INIT_STATE, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_LOADING:
      return {
        isLoading: true,
        isFetching: false,
        isSuccess: false,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_FETCHING:
      return {
        isLoading: false,
        isFetching: true,
        isSuccess: false,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_SUCCESS:
      return {
        isFetching: false,
        isLoading: false,
        isSuccess: true,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_FAIL:
      return {
        isFetching: false,
        isLoading: false,
        isSuccess: false,
        isFail: true,
      };
    default:
      return state;
  }
};

interface useCartItemListReturn {
  state: typeof INIT_STATE;
  cartItemList: CartItem[] | undefined;
}

const useCartItemList = (): useCartItemListReturn => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [cartItemList, setCartItemList] = useState<CartItem[]>();

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { content } = await fetchCartItems({
        method: "GET",
        params: {
          page: "0",
          size: "50",
        },
      });
      setCartItemList(content);
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }
  };

  return {
    state,
    cartItemList,
  };
};
export default useCartItemList;
