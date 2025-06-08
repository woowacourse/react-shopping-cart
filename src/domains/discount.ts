import {
  CouponType,
  FixedCoupon,
  PercentageCoupon,
  BuyXGetYCoupon,
} from "../types/coupon";
import { CartItemType } from "../types/response";

export function calculateDiscountAmount({
  price,
  cartItems,
  deliveryCost,
  selectedCoupon,
}: {
  price: number;
  cartItems: CartItemType[];
  deliveryCost: number;
  selectedCoupon: CouponType[];
}): number {
  if (selectedCoupon.length === 0) return 0;

  if (selectedCoupon.length === 1) {
    return getDiscountAmount(selectedCoupon[0], price, cartItems, deliveryCost);
  }

  const [firstCoupon, secondCoupon] = selectedCoupon;

  let firstThenSecond = getDiscountAmount(
    firstCoupon,
    price,
    cartItems,
    deliveryCost
  );

  firstThenSecond += getDiscountAmount(
    secondCoupon,
    price - firstThenSecond,
    cartItems,
    deliveryCost
  );

  let secondThenFirst = getDiscountAmount(
    secondCoupon,
    price,
    cartItems,
    deliveryCost
  );

  secondThenFirst += getDiscountAmount(
    firstCoupon,
    price - secondThenFirst,
    cartItems,
    deliveryCost
  );

  return Math.max(firstThenSecond, secondThenFirst);
}

function getDiscountAmount(
  coupon: CouponType,
  price: number,
  cartItems: CartItemType[],
  shippingCost: number
): number {
  switch (coupon.discountType) {
    case "fixed": {
      return Math.max(0, (coupon as FixedCoupon).discount);
    }

    case "percentage": {
      const percentage = (coupon as PercentageCoupon).discount;
      return Math.floor(price * (percentage / 100));
    }

    case "freeShipping": {
      return Math.max(0, shippingCost);
    }

    case "buyXgetY": {
      const { buyQuantity, getQuantity } = coupon as BuyXGetYCoupon;
      const biggestPrice = Math.max(
        ...cartItems
          .filter((item) => item.quantity >= buyQuantity + getQuantity)
          .map((item) => item.product.price)
      );
      const biggestPriceItem = cartItems.find(
        (item) => item.product.price === biggestPrice
      );

      const freeQuantity =
        biggestPriceItem!.quantity / (buyQuantity + getQuantity);

      return freeQuantity * biggestPrice;
    }

    default:
      return 0;
  }
}
