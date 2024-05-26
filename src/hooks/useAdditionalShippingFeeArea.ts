import {
  additionalShippingFeeAreaState,
  discountAmountState,
  selectedCouponsState,
} from "@/store/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { ADDITIONAL_SHIPPING_FEE } from "@/constants/system";

const useAdditionalShippingFeeArea = () => {
  const [isSelected, setSelected] = useRecoilState(
    additionalShippingFeeAreaState
  );

  const [discountAmount, setDiscountAmount] =
    useRecoilState(discountAmountState);
  const selectedCoupons = useRecoilValue(selectedCouponsState);

  const handleSelect = () => {
    setSelected(!isSelected);

    if (
      !selectedCoupons.some((coupon) => coupon.discountType === "freeShipping")
    ) {
      return;
    }

    if (!isSelected) {
      setDiscountAmount(discountAmount + ADDITIONAL_SHIPPING_FEE);
    } else {
      setDiscountAmount(discountAmount - ADDITIONAL_SHIPPING_FEE);
    }
  };

  return { isSelected, handleSelect };
};

export default useAdditionalShippingFeeArea;
