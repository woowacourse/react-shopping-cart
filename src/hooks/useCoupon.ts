import {
  isValidAvailableTime,
  isValidExpirationDate,
  isValidMinimumAmount,
  isValidMinimumQuantity,
} from "@/utils/isValidCoupon";

import { CouponType } from "@/types/coupon.type";
import { MAX_APPLICABLE_COUPON } from "@/constants/system";
import { cartSummaryState } from "@/store/selectors/summarySelector/cartSummarySelector";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface Props {
  coupon: CouponType;
  selectedCoupons: CouponType[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<CouponType[]>>;
}

const useCoupon = ({ coupon, selectedCoupons, setSelectedCoupons }: Props) => {
  const [isSelected, setSelected] = useState(selectedCoupons.includes(coupon));
  const { orderPrice } = useRecoilValue(cartSummaryState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const handleSelect = () => {
    setSelected((isSelected) => !isSelected);

    if (isSelected && !selectedCoupons.includes(coupon)) {
      const newList = [...selectedCoupons, coupon];
      setSelectedCoupons(newList);
      return;
    }

    const filteredList = selectedCoupons.filter(
      (selectedCoupon) => coupon.id !== selectedCoupon.id
    );

    setSelectedCoupons(filteredList);
  };

  const checkDisabled = () => {
    if (!isValidExpirationDate(coupon.expirationDate)) {
      return true;
    }
    if (!isValidAvailableTime(coupon.availableTime)) {
      return true;
    }
    if (!isValidMinimumAmount(orderPrice, coupon.minimumAmount)) {
      return true;
    }

    const minimumQuantity =
      coupon.buyQuantity &&
      coupon.getQuantity &&
      coupon.buyQuantity + coupon.getQuantity;

    if (!isValidMinimumQuantity(selectedItems, minimumQuantity)) {
      return true;
    }
    if (
      selectedCoupons.length >= MAX_APPLICABLE_COUPON &&
      !selectedCoupons.includes(coupon)
    ) {
      return true;
    }

    return false;
  };

  const disabled = checkDisabled();

  return { isSelected, disabled, handleSelect };
};

export default useCoupon;
