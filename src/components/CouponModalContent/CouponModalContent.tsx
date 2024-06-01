import React, { useEffect } from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import CouponModalCard from '../CouponModalCard/CouponModalCard';
import * as S from './CouponModalContent.styled';
import { useOrderCalculator } from '../../hooks/useOrderCalculator';
import { useCouponChecker } from '../../hooks/useCouponChecker';
import { useUpdateSelectedCoupons } from '../../hooks/useUpdateSelectedCoupons';
import { useCouponApplicabilityChecker } from '../../hooks/useCouponApplicabilityChecker';
import {
  fetchCouponsSelector,
  orderItemsSelector,
} from '../../recoil/selectors';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { couponsState } from '../../recoil/atoms';
import { Coupon } from '../../types/Coupon';
import { ORDER } from '../../constants/Order';

interface CouponModalContentProps {
  toggleModal: () => void;
}

function CouponModalContent({ toggleModal }: CouponModalContentProps) {
  const fetchedCoupons = useRecoilValue(fetchCouponsSelector);
  const setCoupons = useSetRecoilState(couponsState);
  useEffect(() => {
    setCoupons(
      fetchedCoupons.map((coupon) => ({ ...coupon, isChecked: false })),
    );
  }, [fetchedCoupons]);

  const {
    coupons,
    toggleCouponCheck,
    getCheckedCount,
    isOrderItemCountUpperBuyQuantity,
  } = useCouponChecker();
  const { calculateDiscountWithCoupon, calculateOrderTotal } =
    useOrderCalculator();
  const { updateSelectedCoupons } = useUpdateSelectedCoupons();
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const orderItems = useRecoilValue(orderItemsSelector);
  const orderTotal = calculateOrderTotal();

  const handleModalButton = () => {
    toggleModal();
    updateSelectedCoupons();
  };

  const handleIsAvailable = (coupon: Coupon): boolean => {
    if (getCheckedCount() >= ORDER.availableCouponCount && !coupon.isChecked)
      return false;
    return coupon.buyQuantity
      ? isOrderItemCountUpperBuyQuantity(orderItems) &&
          isCouponApplicable(coupon, orderTotal)
      : isCouponApplicable(coupon, orderTotal);
  };

  const handleCouponChecked = (id: number, coupon: Coupon) => () => {
    if (!handleIsAvailable(coupon)) return;
    toggleCouponCheck(id);
  };

  return (
    <>
      <S.CouponModalContentWrapper>
        <NotificationMessage message={MESSAGES.couponModalNotification} />
        <S.CouponModalCardWrapper>
          {coupons.map((coupon) => (
            <CouponModalCard
              key={coupon.id}
              isAvailable={handleIsAvailable(coupon)}
              name={coupon.description}
              expirationDate={coupon.expirationDate}
              minimumAmount={coupon.minimumAmount}
              availableTime={coupon.availableTime}
              isChecked={coupon.isChecked}
              handleCouponChecked={handleCouponChecked(coupon.id, coupon)}
            />
          ))}
        </S.CouponModalCardWrapper>
      </S.CouponModalContentWrapper>

      <S.CouponModalButton onClick={handleModalButton}>
        <p>총 {calculateDiscountWithCoupon('modal')}원 할인 쿠폰 사용하기</p>
      </S.CouponModalButton>
    </>
  );
}

export default CouponModalContent;
