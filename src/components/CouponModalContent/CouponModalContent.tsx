import React, { useEffect } from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import CouponModalCard from '../CouponModalCard/CouponModalCard';
import * as S from './CouponModalContent.styled';
import { useOrderCalculator } from '../../hooks/useOrderCalculator';
import { useCouponChecker } from '../../hooks/useCouponChecker';
import { useUpdateSelectedCoupons } from '../../hooks/useUpdateSelectedCoupons';
import { useCouponApplicabilityChecker } from '../../hooks/useCouponApplicabilityChecker';
import { fetchCouponsSelector } from '../../recoil/selectors';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { couponsState } from '../../recoil/atoms';

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

  const { coupons, toggleCouponCheck, getCheckedCount } = useCouponChecker();
  const { calculateDiscountWithCoupon, calculateOrderTotal } =
    useOrderCalculator();
  const { updateSelectedCoupons } = useUpdateSelectedCoupons();
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const handleCouponChecked = (id: number) => () => {
    toggleCouponCheck(id);
  };

  const handleModalButton = () => {
    toggleModal();
    updateSelectedCoupons();
  };

  const orderTotal = calculateOrderTotal();

  return (
    <>
      <S.CouponModalContentWrapper>
        <NotificationMessage message={MESSAGES.couponModalNotification} />
        <S.CouponModalCardWrapper>
          {coupons.map((coupon) => (
            <CouponModalCard
              key={coupon.id}
              isAvailable={isCouponApplicable(coupon, orderTotal)}
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
        <p>총 {calculateDiscountWithCoupon('modal')}원 할인 쿠폰 사용하기</p>
      </S.CouponModalButton>
    </>
  );
}

export default CouponModalContent;
