import { SelectState } from "../stores/SelectReducer";
import { CouponType, DiscountType } from "../types/types";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

export const SELECTED_INFO_KEY = "selectedInfo";

export const checkIsAllSelected = (selectState: SelectState[]) =>
  selectState.every((item) => item.selected);

export const getIsSelectedCoupon = (
  discountType: DiscountType,
  selectedCoupons: CouponType[]
) => selectedCoupons.some((coupon) => coupon.discountType === discountType);

export const setSelectedInfoAllDeSelect = (selectState: SelectState[]) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      return {
        id: state.id,
        selected: false,
      };
    })
  );
};

export const setSelectedInfoAllSelect = (selectState: SelectState[]) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      return {
        id: state.id,
        selected: true,
      };
    })
  );
};

export const setSelectedInfo = (
  selectState: SelectState[],
  id: number,
  isSelected: boolean
) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      if (state.id === id) {
        return {
          id: state.id,
          selected: isSelected,
        };
      }

      return state;
    })
  );
};

export const deleteSelectInfo = (id: number) => {
  const selectedState = getLocalStorage<SelectState[]>(SELECTED_INFO_KEY) || [];

  setLocalStorage(
    SELECTED_INFO_KEY,
    selectedState.filter((state) => state.id !== id)
  );
};
