import { DiscountType } from "../types/types";

export const initialState: DiscountType[] = [];

type ActionType = "ADD_COUPON" | "REMOVE_COUPON";

export interface SelectAction {
  type: ActionType;
  payload: {
    coupon: DiscountType;
  };
}

export const selectCouponReducer = (
  state: DiscountType[],
  action: SelectAction
) => {
  switch (action.type) {
    case "ADD_COUPON":
      return [...state, action.payload.coupon];

    case "REMOVE_COUPON":
      return state.filter((coupon) => coupon !== action.payload.coupon);

    default:
      return state;
  }
};
