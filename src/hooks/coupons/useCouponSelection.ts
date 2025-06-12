import { MAX_COUPON_COUNT } from "../../constants";
import { useSelected } from "../useSelected";

export const useCouponSelection = () => {
  const {
    selectedItemIds: selectedCouponIds,
    toggleSelectedItemId,
    replaceSelectedItemIds,
  } = useSelected({});

  const toggleCouponSelection = (id: number) => {
    const newSet = new Set(selectedCouponIds);
    const isAlreadySelected = newSet.has(id);
    if (isAlreadySelected || newSet.size < MAX_COUPON_COUNT) {
      toggleSelectedItemId(id);
    } else {
      alert(`쿠폰은 최대 ${MAX_COUPON_COUNT}개까지만 선택할 수 있습니다.`);
    }
  };

  return { selectedCouponIds, toggleCouponSelection, replaceSelectedItemIds };
};
