import { discountAmountState, selectedCouponsState } from "@/store/atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { CouponType } from "@/types/coupon.type";
import useDiscountSimulator from "./useDiscountSimulator";

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

  const setDiscountAmount = useSetRecoilState(discountAmountState);

  const { calculateDiscountAmount } = useDiscountSimulator();

  const tempDiscount = tempSelectedCoupons.reduce((accAmount, curCoupon) => {
    accAmount = accAmount + calculateDiscountAmount(curCoupon);
    return accAmount;
  }, 0);

  const handleClick = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setDiscountAmount(tempDiscount);
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
