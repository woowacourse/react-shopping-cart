import { CouponData } from "../../../types";

export function isCouponUsable({ coupon, currentAmount = 0 }: { coupon: CouponData; currentAmount?: number }): boolean {
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
  reason?: string;
  timeRemaining?: string;
} {
  const now = new Date();

  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) {
    return { isUsable: false, reason: "만료된 쿠폰입니다." };
  }

  if (coupon.minimumAmount && currentAmount < coupon.minimumAmount) {
    const needed = coupon.minimumAmount - currentAmount;
    return {
      isUsable: false,
      reason: `${needed.toLocaleString()}원 더 주문하면 사용할 수 있습니다.`,
    };
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
      const waitMinutes = startMinutes - nowMinutes;
      const waitHours = Math.floor(waitMinutes / 60);
      const waitMins = waitMinutes % 60;
      return {
        isUsable: false,
        reason: `${waitHours > 0 ? `${waitHours}시간 ` : ""}${waitMins}분 후 사용 가능합니다.`,
      };
    }

    if (nowMinutes > endMinutes) {
      return {
        isUsable: false,
        reason: "사용 가능한 시간이 지났습니다.",
      };
    }

    const remainingMinutes = endMinutes - nowMinutes;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;

    return {
      isUsable: true,
      timeRemaining: `${remainingHours > 0 ? `${remainingHours}시간 ` : ""}${remainingMins}분 남음`,
    };
  }

  return { isUsable: true };
}
