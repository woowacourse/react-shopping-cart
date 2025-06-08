import { CouponType } from "../types/types";

export const initialState: CouponType[] = [];

type ActionType = "ADD_COUPON" | "REMOVE_COUPON" | "RESET_COUPON";

export interface SelectAction {
  type: ActionType;
  payload: {
    coupon?: CouponType;
  };
}

export const selectCouponReducer = (
  state: CouponType[],
  action: SelectAction
) => {
  switch (action.type) {
    case "ADD_COUPON":
      if (!action.payload.coupon) return state;
      return [...state, action.payload.coupon];

    case "REMOVE_COUPON":
      if (!action.payload.coupon) return state;
      return state.filter((coupon) => coupon.id !== action.payload.coupon!.id);

    case "RESET_COUPON":
      return initialState;
    default:
      return state;
  }
};
