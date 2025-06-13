import { CouponType } from "../types/types";

export const initialState: CouponType[] = [];

type ActionType =
  | "SELECT_COUPON"
  | "DESELECT_COUPON"
  | "RESET_COUPON"
  | "SET_COUPON";

export interface SelectAction {
  type: ActionType;
  payload: {
    coupon?: CouponType;
    coupons?: CouponType[];
  };
}

export const selectCouponReducer = (
  state: CouponType[],
  action: SelectAction
) => {
  switch (action.type) {
    case "SELECT_COUPON":
      if (!action.payload.coupon) return state;
      return [...state, action.payload.coupon];

    case "DESELECT_COUPON":
      if (!action.payload.coupon) return state;
      return state.filter((coupon) => coupon.id !== action.payload.coupon?.id);

    case "RESET_COUPON":
      return initialState;

    case "SET_COUPON":
      return [...(action.payload.coupons || [])];

    default:
      return state;
  }
};
