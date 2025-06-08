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

export type CouponResponse =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;

export type Coupon = {
  id: string;
  code: string;
  description: string;
  expirationDate: [number, number, number];
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
} & (
  | {
      discountType: "fixed";
      discount: number;
      minimumAmount: number;
    }
  | {
      discountType: "buyXgetY";
      buyQuantity: number;
      getQuantity: number;
    }
  | {
      discountType: "freeShipping";
      minimumAmount: number;
    }
  | {
      discountType: "percentage";
      discount: number;
      availableTime?: {
        start: string;
        end: string;
      };
    }
);

export async function getCouponData(): Promise<Coupon[]> {
  const response = await baseAPI<CouponResponse[]>({
    method: "GET",
    path: "/coupons",
  });
  const couponsData = (response ?? []).map(
    (coupon) => convertResponseToCoupon(coupon) as Coupon
  );
  return couponsData;
}

function convertResponseToCoupon(coupon: CouponResponse) {
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
      const { discount, minimumAmount } = coupon;
      return {
        ...base,
        discount: Number(discount),
        minimumAmount: Number(minimumAmount),
      };
    }
    case "buyXgetY": {
      const { buyQuantity, getQuantity } = coupon;
      return {
        ...base,
        buyQuantity: Number(buyQuantity),
        getQuantity: Number(getQuantity),
      };
    }
    case "freeShipping": {
      const { minimumAmount } = coupon;
      return {
        ...base,
        minimumAmount: Number(minimumAmount),
      };
    }
    case "percentage": {
      const { discount, availableTime } = coupon;
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
