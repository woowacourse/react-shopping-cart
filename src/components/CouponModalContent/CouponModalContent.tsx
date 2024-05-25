import React from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import CouponModalCard from '../CouponModalCard/CouponModalCard';
import * as S from './CouponModalContent.styled';
import { useOrderCalculator } from '../../hooks/useOrderCalculator';
import { useCouponChecker } from '../../hooks/useCouponChecker';
import { useUpdateSelectedCoupons } from '../../hooks/useUpdateSelectedCoupons';
import { useCouponApplicabilityChecker } from '../../hooks/useCouponApplicabilityChecker';

interface CouponModalContentProps {
  toggleModal: () => void;
}

function CouponModalContent({ toggleModal }: CouponModalContentProps) {
  const { coupons, toggleCouponCheck, getCheckedCount } = useCouponChecker();
  const { calculateDiscountWithCoupon } = useOrderCalculator();
  const { updateSelectedCoupons } = useUpdateSelectedCoupons();
  const { calculateOrderTotal } = useOrderCalculator();
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const handleCouponChecked = (id: number) => () => {
    toggleCouponCheck(id);
  };

  const handleModalButton = () => {
    toggleModal();
    updateSelectedCoupons();
  };

  return (
    <>
      <S.CouponModalContentWrapper>
        <NotificationMessage message={MESSAGES.couponModalNotification} />
        <S.CouponModalCardWrapper>
          {coupons.map((coupon, i) => (
            <CouponModalCard
              key={i}
              isAvailable={isCouponApplicable(coupon, calculateOrderTotal())}
              name={coupon.description}
              expirationDate={coupon.expirationDate}
              minimumAmount={coupon.minimumAmount}
              availableTime={coupon.availableTime}
              isChecked={coupon.isChecked}
              handleCouponChecked={handleCouponChecked(coupon.id)}
            />
          ))}
        </S.CouponModalCardWrapper>
      </S.CouponModalContentWrapper>

      <S.CouponModalButton onClick={handleModalButton}>
        <S.CouponModalButtonText>
          총 {calculateDiscountWithCoupon('modal')}원 할인 쿠폰 사용하기
        </S.CouponModalButtonText>
      </S.CouponModalButton>
    </>
  );
}

export default CouponModalContent;
