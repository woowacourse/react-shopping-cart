import { Coupon } from "../types/coupon";
import { formatTime } from "./formatters";

export class CouponFormatter {
  /**
   * 쿠폰의 상세 정보를 포맷팅합니다.
   */
  static getCouponDetails(coupon: Coupon): string[] {
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
  }
}
