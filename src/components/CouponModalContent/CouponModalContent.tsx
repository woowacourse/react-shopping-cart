import React, { useEffect } from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import CouponModalCard from '../CouponModalCard/CouponModalCard';
import * as S from './CouponModalContent.styled';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { couponsState } from '../../recoil/atoms';
import {
  couponCheckedSelector,
  fetchCouponsSelector,
} from '../../recoil/selectors';

interface CouponModalContentProps {
  toggleModal: () => void;
}

function CouponModalContent({ toggleModal }: CouponModalContentProps) {
  const fetchedCoupons = useRecoilValue(fetchCouponsSelector);
  const [coupons, setCoupons] = useRecoilState(couponsState);

  const setCouponChecked = useSetRecoilState(couponCheckedSelector);

  useEffect(() => {
    setCoupons(
      fetchedCoupons.map((coupon) => ({ ...coupon, isChecked: false })),
    );
  }, [fetchedCoupons]);

  const handleCouponChecked = (id: number) => () => {
    setCouponChecked(id);
  };

  return (
    <>
      <NotificationMessage message={MESSAGES.couponModalNotification} />
      {coupons.map((coupon, i) => (
        <CouponModalCard
          key={i}
          id={coupon.id}
          name={coupon.description}
          expirationDate={coupon.expirationDate}
          minimumAmount={coupon.minimumAmount}
          availableTime={coupon.availableTime}
          isChecked={coupon.isChecked}
          handleCouponChecked={handleCouponChecked(coupon.id)}
        />
      ))}
      <S.CouponModalButton onClick={() => toggleModal()}>
        총 6,000원 할인 쿠폰 사용하기
      </S.CouponModalButton>
    </>
  );
}

export default CouponModalContent;
