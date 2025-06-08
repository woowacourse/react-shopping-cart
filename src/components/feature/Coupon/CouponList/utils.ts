import { CouponResponse } from "../../../../type/coupon";
import { CartProduct } from "../../../../type/cart";

export const getSelectedCartItems = (
  cartItems: CartProduct[],
  selectedCartIds: number[]
) => {
  return cartItems.filter((item: CartProduct) =>
    selectedCartIds.includes(item.id)
  );
};

export const getSelectedCoupons = (
  coupons: CouponResponse[],
  selectedIds: number[]
) => coupons?.filter((coupon) => selectedIds.includes(coupon.id));

export const isValidCoupon = (
  coupon: CouponResponse,
  totalPrice: number,
  isRemoteArea: boolean,
  selectedCartItems: CartProduct[]
): boolean => {
  if (!isValidDate(coupon.expirationDate)) return false;

  switch (coupon.discountType) {
    case "freeShipping": {
      if (totalPrice >= 100_000 && !isRemoteArea) return false;
      if (Number(coupon.minimumAmount) > totalPrice) return false;
      return true;
    }

    case "buyXgetY": {
      return selectedCartItems.some(
        (item: CartProduct) => item.quantity > coupon.buyQuantity!
      );
    }

    case "fixed": {
      return Number(coupon.minimumAmount) <= totalPrice;
    }

    case "percentage": {
      if (coupon.availableTime && !isValidTime(coupon.availableTime))
        return false;
      return true;
    }
  }
};

const isValidDate = (expirationDate: string): boolean => {
  const today = new Date();
  const expiration = new Date(expirationDate);

  return expiration >= today;
};

const isValidTime = (availableTime: { start: string; end: string }) => {
  const now = new Date();
  const nowTime = now.getHours() * 60 + now.getMinutes();

  const [startHour, startMin] = availableTime.start.split(":").map(Number);
  const [endHour, endMin] = availableTime.end.split(":").map(Number);

  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  return nowTime >= startTime && nowTime <= endTime;
};

export const calculateDiscount = (
  selectedCartItems: CartProduct[],
  coupon: CouponResponse,
  totalPrice: number,
  isRemoteArea: boolean
) => {
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discount;

    case "buyXgetY": {
      const eligibleItems = selectedCartItems.filter(
        (item: CartProduct) => item.quantity > coupon.buyQuantity
      );

      eligibleItems.sort(
        (a: CartProduct, b: CartProduct) => b.product.price - a.product.price
      );

      return eligibleItems[0].product.price;
    }

    case "freeShipping": {
      const deliveryPrice = totalPrice >= 100_000 ? 0 : 3000;
      return isRemoteArea ? 3000 + deliveryPrice : deliveryPrice;
    }

    case "percentage":
      return (totalPrice * coupon.discount) / 100;

    default:
      return 0;
  }
};
