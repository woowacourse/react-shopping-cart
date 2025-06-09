import { Coupon } from '../types/coupon';

export const formatCouponExpirationDate = (expirationDate?: string): string => {
  if (!expirationDate) return '';

  const date = new Date(expirationDate);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  const [hours] = timeString.split(':').map(Number);
  const period = hours < 12 ? '오전' : '오후';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${period} ${displayHours}시`;
};

export const formatCouponTimeRange = (coupon: Coupon): string | null => {
  if (!coupon.availableTime) return null;

  const start = formatTime(coupon.availableTime.start);
  const end = formatTime(coupon.availableTime.end);
  return `${start}부터 ${end}까지`;
};

export const formatMinimumAmount = (amount?: number): string => {
  if (!amount) return '';
  return `${amount.toLocaleString()}원`;
};
