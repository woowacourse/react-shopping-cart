import { useEffect, useReducer } from "react";

import getCartItemList from "../api/cart/getCartItemList";
import patchProduct from "../api/cart/patchProduct";
import deleteProduct from "../api/cart/deleteProduct";

import { useCartItemListContext } from "../contexts/CartItemListContext";
import { useErrorContext } from "../contexts/ErrorContext";

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
  cartItemList: CartItem[];
  patchCartItem: (id: number, quantity: number) => Promise<void>;
  deleteCartItem: (id: number) => Promise<void>;
}

const useCartItemList = (): useCartItemListReturn => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { cartItemList, updateCartItemList } = useCartItemListContext();
  const { handleErrorMessage } = useErrorContext();

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { content } = await getCartItemList({
        page: "0",
        size: "50",
      });
      updateCartItemList(content);
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니 데이터를 불러오지 못했습니다.");
    }
  };

  const patchCartItem = async (id: number, quantity: number) => {
    dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
    if (cartItemList.length >= 50) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니에는 최대 50개까지만 담을 수 있습니다.");
      return;
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await patchProduct({
        productId: id,
        quantity,
      });
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니의 수량을 변경하는데 실패했습니다.");
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니 데이터를 불러오지 못했습니다.");
    }
    dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
  };

  const deleteCartItem = async (id: number) => {
    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });

      await deleteProduct({
        productId: id,
      });
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      error instanceof Error && dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니 상품을 삭제하지 못했습니다.");
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("장바구니 데이터를 불러오지 못했습니다.");
    }
  };

  return {
    state,
    cartItemList,
    patchCartItem,
    deleteCartItem,
  };
};
export default useCartItemList;
