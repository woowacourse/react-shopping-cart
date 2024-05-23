import React, { useEffect } from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import CouponModalCard from '../CouponModalCard/CouponModalCard';
import * as S from './CouponModalContent.styled';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { couponsState } from '../../recoil/atoms';
import { fetchCouponsSelector } from '../../recoil/selectors';

interface CouponModalContentProps {
  toggleModal: () => void;
}

function CouponModalContent({ toggleModal }: CouponModalContentProps) {
  const coupons = useRecoilValue(fetchCouponsSelector);
  const setCoupons = useSetRecoilState(couponsState);

  useEffect(() => {
    setCoupons(coupons);
  }, [coupons]);

  return (
    <>
      <NotificationMessage message={MESSAGES.couponModalNotification} />
      {coupons.map((coupon, i) => (
        <CouponModalCard
          key={i}
          name={coupon.description}
          expirationDate={coupon.expirationDate}
          minimumAmount={coupon.minimumAmount}
          availableTime={coupon.availableTime}
        />
      ))}
      <S.CouponModalButton onClick={() => toggleModal()}>
        총 6,000원 할인 쿠폰 사용하기
      </S.CouponModalButton>
    </>
  );
}

export default CouponModalContent;
