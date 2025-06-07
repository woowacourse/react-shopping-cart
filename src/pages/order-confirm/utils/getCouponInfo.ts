import { Coupon } from "@/apis/coupon/coupon.type";
import { formatDateToKorean } from "@/shared/utils/formatDateToKorean";
import { formatTimeToKoreanHour } from "@/shared/utils/formatTimeToKoreanHour";

export const getCouponInfo = (coupon: Coupon) => {
  const defaultInfo = [
    {
      label: "만료일",
      value: formatDateToKorean(coupon.expirationDate),
    },
  ];

  switch (coupon.discountType) {
    case "fixed": {
      const { minimumAmount } = coupon;
      return [
        ...defaultInfo,
        {
          label: "최소 구매 금액",
          value: `${minimumAmount.toLocaleString()}원`,
        },
      ];
    }
    case "buyXgetY": {
      return [...defaultInfo];
    }
    case "freeShipping": {
      const { minimumAmount } = coupon;
      return [
        ...defaultInfo,
        {
          label: "최소 구매 금액",
          value: `${minimumAmount.toLocaleString()}원`,
        },
      ];
    }
    case "percentage": {
      const { availableTime } = coupon;
      const startHour = formatTimeToKoreanHour(availableTime.start);
      const endHour = formatTimeToKoreanHour(availableTime.end);
      return [
        ...defaultInfo,
        {
          label: "사용 가능 시간",
          value: `오전 ${startHour}시부터 ${endHour}시까지`,
        },
      ];
    }
    default:
      return [
        {
          label: "",
          value: "",
        },
      ];
  }
};
