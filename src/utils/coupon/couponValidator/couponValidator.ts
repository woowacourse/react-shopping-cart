import { TCartItem } from '../../../types/CartItem.type';

export const isCouponExpired = (expirationDate: string, now: Date) => {
  const expiration = new Date(expirationDate);
  return now > expiration;
};

export const isCouponMinimumAmount = (minimumAmount: number, totalPrice: number) => {
  return totalPrice >= minimumAmount;
};

export const isCouponAvaliableTime = (availableTime: { start: string; end: string }, now: Date) => {
  const [startHour, startMinute, startSecond] = availableTime.start.split(':').map(Number);
  const [endHour, endMinute, endSecond] = availableTime.end.split(':').map(Number);

  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

  return now >= startTime && now <= endTime;
};

export const isCouponAvaliableQuantity = (items: TCartItem[], buyQuantity: number, getQuantity: number) => {
  return items.some((item) => item.quantity >= buyQuantity + getQuantity);
};
