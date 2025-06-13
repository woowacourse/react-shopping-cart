import { Coupon } from "../types/coupon";

export type CouponSelectState = {
  id: number;
  selected: boolean;
};

export const initialState: CouponSelectState[] = [];

type ActionType =
  | "ADD_COUPON_SELECT"
  | "REMOVE_COUPON_SELECT"
  | "SET_COUPON_SELECT"
  | "CLEAR_COUPON_SELECT";

export interface CouponSelectAction {
  type: ActionType;
  payload: {
    id?: number;
    coupons?: Coupon[];
  };
}

export const couponSelectReducer = (
  state: CouponSelectState[],
  action: CouponSelectAction
) => {
  switch (action.type) {
    case "SET_COUPON_SELECT":
      return action.payload.coupons?.length
        ? action.payload.coupons.map((coupon) => ({
            id: coupon.id,
            selected: false,
          }))
        : [];
    case "ADD_COUPON_SELECT": {
      const selectedCount = state.filter((item) => item.selected).length;
      if (selectedCount >= 2) {
        return state;
      }
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, selected: true } : item
      );
    }
    case "REMOVE_COUPON_SELECT":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, selected: false } : item
      );
    case "CLEAR_COUPON_SELECT":
      return state.map((item) => ({ ...item, selected: false }));
    default:
      return state;
  }
};
