import getKoreanTime from './getKoreanTime';

import { Coupon } from '@/types/coupon';

export const isCouponActive = (coupon: Coupon) => {
  const couponExpirationDate = new Date(coupon.expirationDate);
  const now = getKoreanTime();

  return couponExpirationDate >= now;
};

export const isOverMinimumOrderAmount = (coupon: Coupon, amount: number) => {
  if (coupon.minimumAmount === undefined) return true;

  return coupon.minimumAmount <= amount;
};

export const isOverBuyQuantity = (
  quantities: number[],
  buyQuantity: number,
  getQuantity: number,
) => {
  if (buyQuantity === undefined) return true;
  if (getQuantity === undefined) return true;

  console.log(quantities, buyQuantity);

  return quantities.some((quantity) => buyQuantity + getQuantity <= quantity);
};

export const isCouponUsableTime = (coupon: Coupon, now: Date = getKoreanTime()) => {
  if (coupon.availableTime === undefined) return true;

  const [startHours, startMinutes, startSeconds] = coupon.availableTime.start
    .split(':')
    .map(Number);
  const [endHours, endMinutes, endSeconds] = coupon.availableTime.end.split(':').map(Number);

  const startTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    startHours,
    startMinutes,
    startSeconds,
  );
  const endTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    endHours,
    endMinutes,
    endSeconds,
  );

  return now <= endTime && now >= startTime;
};
