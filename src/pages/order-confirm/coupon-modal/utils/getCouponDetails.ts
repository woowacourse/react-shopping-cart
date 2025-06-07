import { Coupon } from "../../../../api/coupon";

export const getCouponDetails = (coupon: Coupon) => {
  switch (coupon.discountType) {
    case "fixed":
      return [
        ["최소 주문 금액", `${coupon.minimumAmount?.toLocaleString()}원`],
        ["할인 금액", `${coupon.discount?.toLocaleString()}원`],
      ];
    case "buyXgetY":
      return [
        ["구매 조건", `${coupon.buyQuantity}개 구매 시`],
        ["증정", `${coupon.getQuantity}개 추가 증정`],
      ];
    case "freeShipping":
      return [
        ["최소 주문 금액", `${coupon.minimumAmount?.toLocaleString()}원`],
        ["혜택", "무료 배송"],
      ];
    case "percentage":
      return [
        ["할인율", `${coupon.discount}%`],
        coupon.availableTime
          ? [
              "사용 가능 시간",
              `${coupon.availableTime.start} ~ ${coupon.availableTime.end}`,
            ]
          : null,
      ].filter(Boolean);
    default:
      return [];
  }
};
