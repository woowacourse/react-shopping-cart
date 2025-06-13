import { Coupon } from '../types/coupon';

const convertToMinutes = (hours: number, minutes: number): number => {
  return hours * 60 + minutes;
};

const parseTimeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return convertToMinutes(hours, minutes);
};

export const isCouponAvailable = (coupon: Coupon): boolean => {
  const today = new Date();
  const expirationDate = new Date(coupon.expirationDate);

  if (expirationDate < today) {
    return false;
  }

  if (coupon.availableTime) {
    const currentTime = convertToMinutes(today.getHours(), today.getMinutes());
    const startTime = parseTimeToMinutes(coupon.availableTime.start);
    const endTime = parseTimeToMinutes(coupon.availableTime.end);

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }
  }

  return true;
};
