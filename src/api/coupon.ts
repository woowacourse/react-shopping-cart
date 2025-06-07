import { baseAPI } from "./baseAPI";

interface BaseCoupon {
  id: string;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}

interface FixedDiscountCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
  minimumAmount: number;
}

interface PercentageCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;

export async function getCouponData() {
  const response = await baseAPI<Coupon[]>({
    method: "GET",
    path: "/coupons",
  });
  const couponsData = (response ?? []).map((coupon) =>
    convertResponseToCoupon(coupon)
  );
  return couponsData;
}

function convertResponseToCoupon(coupon: Coupon) {
  const { id, code, description, expirationDate, discountType } = coupon;
  const date = new Date(expirationDate);

  const base = {
    id: id.toString(),
    code,
    description,
    expirationDate: [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ] as [number, number, number],
    discountType,
  };

  switch (discountType) {
    case "fixed": {
      const { discount, minimumAmount } = coupon as FixedDiscountCoupon;
      return {
        ...base,
        discount: Number(discount),
        minimumAmount: Number(minimumAmount),
      };
    }
    case "buyXgetY": {
      const { buyQuantity, getQuantity } = coupon as BuyXGetYCoupon;
      return {
        ...base,
        buyQuantity: Number(buyQuantity),
        getQuantity: Number(getQuantity),
      };
    }
    case "freeShipping": {
      const { minimumAmount } = coupon as FreeShippingCoupon;
      return {
        ...base,
        minimumAmount: Number(minimumAmount),
      };
    }
    case "percentage": {
      const { discount, availableTime } = coupon as PercentageCoupon;
      return {
        ...base,
        discount: Number(discount),
        ...(availableTime && { availableTime }),
      };
    }
    default:
      throw new Error(`유효하지 않은 할인 유형입니다: ${discountType}`);
  }
}
