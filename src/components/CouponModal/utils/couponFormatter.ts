import { Coupon } from "../../../api/couponApi";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatTime = (timeString: string): string => {
  const [hours] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${ampm} ${displayHour}시`;
};

export const getCouponDetails = (coupon: Coupon): string[] => {
  const details = [];

  if (coupon.minimumAmount) {
    details.push(`최소 주문금액: ${coupon.minimumAmount.toLocaleString()}원`);
  }

  if (coupon.availableTime) {
    const startTime = formatTime(coupon.availableTime.start);
    const endTime = formatTime(coupon.availableTime.end);
    details.push(`사용 가능 시간: ${startTime}부터 ${endTime}까지`);
  }

  if (coupon.discountType === "buyXgetY") {
    details.push(
      `${coupon.buyQuantity}개 구매 시 ${coupon.getQuantity}개 무료`
    );
  }

  if (coupon.discountType === "freeShipping") {
    details.push("도서산간 추가 배송비 포함 무료");
  }

  return details;
};
