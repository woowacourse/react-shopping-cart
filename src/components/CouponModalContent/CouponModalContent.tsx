import React from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { MESSAGES } from '../../constants/Messages';
import { useRecoilValue } from 'recoil';
import { fetchCouponsSelector } from '../../recoil/selectors';
import CouponModalCard from '../CouponModalCard/CouponModalCard';

function CouponModalContent() {
  const fetchedCoupons = useRecoilValue(fetchCouponsSelector);

  return <></>;
}

export default CouponModalContent;
