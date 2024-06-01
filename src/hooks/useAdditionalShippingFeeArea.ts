import {
  additionalShippingFeeAreaState,
  selectedCouponsState,
} from "@/store/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { COUPON_DISCOUNT_TYPE } from "@/constants/system";

const useAdditionalShippingFeeArea = () => {
  const [isSelected, setSelected] = useRecoilState(
    additionalShippingFeeAreaState
  );

  const selectedCoupons = useRecoilValue(selectedCouponsState);

  const handleSelect = () => {
    setSelected((isSelected) => !isSelected);

    if (
      !selectedCoupons.some(
        (coupon) => coupon.discountType === COUPON_DISCOUNT_TYPE.freeShipping
      )
    ) {
      return;
    }
  };

  return { isSelected, handleSelect };
};

export default useAdditionalShippingFeeArea;
