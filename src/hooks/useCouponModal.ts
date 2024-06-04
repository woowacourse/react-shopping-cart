import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { CouponType } from "@/types/coupon.type";
import { calculateDiscountAmount } from "@/utils/calculateDiscountAmount";
import { orderSummaryState } from "@/store/selectors/summarySelector/orderSummarySelector";
import { selectedCouponsState } from "@/store/atoms/atoms";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";

interface Props {
  isOpened: boolean;
  closeModal: () => void;
}

const useCouponModal = ({ isOpened, closeModal }: Props) => {
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<CouponType[]>(
    []
  );
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);

  const { orderPrice, shippingFee } = useRecoilValue(orderSummaryState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const tempDiscount = tempSelectedCoupons.reduce((accAmount, curCoupon) => {
    accAmount =
      accAmount +
      calculateDiscountAmount({
        coupon: curCoupon,
        orderPrice,
        selectedItems,
        shippingFee,
      });
    return accAmount;
  }, 0);

  const handleClick = () => {
    setSelectedCoupons(tempSelectedCoupons);
    closeModal();
  };

  useEffect(() => {
    setTempSelectedCoupons(selectedCoupons);
  }, [isOpened]);

  return {
    tempSelectedCoupons,
    setTempSelectedCoupons,
    tempDiscount,
    handleClick,
  };
};

export default useCouponModal;
