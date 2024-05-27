/* eslint-disable no-case-declarations */
import { ReactNode } from 'react';

import {
  Coupon,
  Text,
  FixedDiscountCoupon,
  BuyXGetYCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from '@/f_shared';

import { formatAmount, formatTime, formatExpirationDate, formatQuantity } from '../../lib/format';

import css from './CouponCard.module.css';

interface CouponCardProps {
  coupon: Coupon;
  actionSlot?: ReactNode;
}

export const CouponCard = ({ coupon, actionSlot }: CouponCardProps) => {
  const renderCouponDetails = () => {
    switch (coupon.discountType) {
      case 'fixed':
        const fixedCoupon = coupon as FixedDiscountCoupon;
        return (
          <>
            <Text type='b2'>{`할인 금액: ${formatAmount(fixedCoupon.discount)}`}</Text>
            <Text type='b2'>{`최소 주문 금액: ${formatAmount(fixedCoupon.minimumAmount)}`}</Text>
          </>
        );
      case 'buyXGetY':
        const buyXGetYCoupon = coupon as BuyXGetYCoupon;
        return (
          <>
            <Text type='b2'>{`구매 수량: ${formatQuantity(buyXGetYCoupon.buyQuantity)}`}</Text>
            <Text type='b2'>{`증정 수량: ${formatQuantity(buyXGetYCoupon.getQuantity)}`}</Text>
          </>
        );
      case 'freeShipping':
        const freeShippingCoupon = coupon as FreeShippingCoupon;
        return (
          <>
            <Text type='b2'>{`최소 주문 금액: ${formatAmount(freeShippingCoupon.minimumAmount)}`}</Text>
          </>
        );
      case 'percentage':
        const percentageCoupon = coupon as PercentageDiscountCoupon;
        const startTime = formatTime(percentageCoupon.availableTime.start);
        const endTime = formatTime(percentageCoupon.availableTime.end);
        return (
          <>
            <Text type='b2'>{`할인율: ${percentageCoupon.discount}%`}</Text>
            <Text type='b2'>{`사용 가능 시간: ${startTime} - ${endTime}`}</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={css.root}>
      <div className={css.header}>
        {actionSlot && <div>{actionSlot}</div>}
        <Text type={'h2'}>{coupon.description}</Text>
      </div>
      <div>
        <Text type='b2'>{`만료일: ${formatExpirationDate(coupon.expirationDate)}`}</Text>
        {renderCouponDetails()}
      </div>
    </div>
  );
};
