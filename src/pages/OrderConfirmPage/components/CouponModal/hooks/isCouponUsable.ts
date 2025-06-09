import { CouponData } from "../../../types";

interface IsCouponUsableProps {
  coupon: CouponData;
  currentAmount?: number;
}

export function isCouponUsable({ coupon, currentAmount = 0 }: IsCouponUsableProps): boolean {
  const now = new Date();

  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) return false;

  if (coupon.minimumAmount && currentAmount < coupon.minimumAmount) {
    return false;
  }

  if (coupon.availableTime) {
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    const [startH, startM] = coupon.availableTime.start.split(":").map(Number);
    const [endH, endM] = coupon.availableTime.end.split(":").map(Number);

    const nowMinutes = nowHour * 60 + nowMin;
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (nowMinutes < startMinutes || nowMinutes > endMinutes) {
      return false;
    }
  }

  return true;
}

export function getCouponUsabilityInfo({ coupon, currentAmount = 0 }: { coupon: CouponData; currentAmount?: number }): {
  isUsable: boolean;
  timeRemaining?: string;
} {
  const now = new Date();

  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) {
    return { isUsable: false };
  }

  if (coupon.minimumAmount && currentAmount < coupon.minimumAmount) {
    return { isUsable: false };
  }

  if (coupon.availableTime) {
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    const [startH, startM] = coupon.availableTime.start.split(":").map(Number);
    const [endH, endM] = coupon.availableTime.end.split(":").map(Number);

    const nowMinutes = nowHour * 60 + nowMin;
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (nowMinutes < startMinutes) {
      return { isUsable: false };
    }

    if (nowMinutes > endMinutes) {
      return { isUsable: false };
    }

    return { isUsable: true };
  }

  return { isUsable: true };
}
