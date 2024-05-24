import { Coupon } from "../types";
import { formatTime } from "./formatTime";

export const getAdditionalInfo = ({
  discountType,
  minimumAmount,
  buyQuantity,
  getQuantity,
  availableTime,
}: Pick<
  Coupon,
  "discountType" | "minimumAmount" | "buyQuantity" | "getQuantity" | "availableTime"
>): string => {
  switch (discountType) {
    case "fixed":
      return `최소 주문 금액: ${minimumAmount?.toLocaleString()}원`;
    case "buyXgetY":
      return `${buyQuantity}개 구매 시 ${getQuantity}개 추가 증정`;
    case "freeShipping":
      return `최소 주문 금액: ${minimumAmount?.toLocaleString()}원`;
    case "percentage":
      return `사용 가능 시간: ${formatTime(availableTime?.start || "")}부터 ${formatTime(availableTime?.end || "")}까지`;
    default:
      return "";
  }
};
