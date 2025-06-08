import { Coupon } from "../../../../../../api/coupon";

export const getCouponDetails = (coupon: Coupon): Array<[string, string]> => {
  const details: Array<[string, string]> = [];

  switch (coupon.discountType) {
    case "fixed":
      details.push(
        ["최소 주문 금액", `${coupon.minimumAmount.toLocaleString()}원`],
        ["할인 금액", `${coupon.discount.toLocaleString()}원`]
      );
      break;
    case "buyXgetY":
      details.push(
        ["구매 조건", `${coupon.buyQuantity}개 구매 시`],
        ["증정 수량", `${coupon.getQuantity}개`]
      );
      break;
    case "freeShipping":
      details.push([
        "최소 주문 금액",
        `${coupon.minimumAmount.toLocaleString()}원`,
      ]);
      break;
    case "percentage":
      details.push(["할인율", `${coupon.discount}%`]);
      if (coupon.availableTime) {
        details.push([
          "사용 가능 시간",
          `${coupon.availableTime.start} ~ ${coupon.availableTime.end}`,
        ]);
      }
      break;
  }
  return details;
};
