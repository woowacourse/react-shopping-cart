import {
  ADDITIONAL_SHIPPING_FEE,
  COUPON_DISCOUNT_TYPE,
} from "@/constants/system";
import {
  additionalShippingFeeAreaState,
  discountAmountState,
  selectedCouponsState,
} from "@/store/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

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
      !selectedCoupons.some(
        (coupon) => coupon.discountType === COUPON_DISCOUNT_TYPE.freeShipping
      )
    ) {
      return;
    }

    if (!isSelected) {
      setDiscountAmount(discountAmount + ADDITIONAL_SHIPPING_FEE);
      return;
    }

    setDiscountAmount(discountAmount - ADDITIONAL_SHIPPING_FEE);
  };

  return { isSelected, handleSelect };
};

export default useAdditionalShippingFeeArea;
