import { useEffect, useReducer, useState } from "react";

import fetchCoupons from "../api/fetchCoupon";

import { useErrorContext } from "../contexts/ErrorContext";

import { Coupon } from "../types/Coupon";

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

interface useCouponsReturn {
  state: typeof INIT_STATE;
  coupons: Coupon[];
}

const useCoupons = (): useCouponsReturn => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { handleErrorMessage } = useErrorContext();

  useEffect(() => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchCoupons({
        method: "GET",
      });
      setCoupons(data);
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      handleErrorMessage("쿠폰 데이터를 불러오지 못했습니다.");
    }
  };

  return {
    state,
    coupons,
  };
};
export default useCoupons;
