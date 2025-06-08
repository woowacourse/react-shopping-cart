import { CouponResponse } from "../../../../type/coupon";
import { CartProduct } from "../../../../type/cart";
import { getDeliveryPrice } from "../../CartSection/PriceSection/utils";

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
) => {
  if (!isValidDate(coupon.expirationDate)) return false;

  switch (coupon.code) {
    case "FREESHIPPING": {
      if (coupon.discountType !== "freeShipping") return false;
      return isValidFreeShipping(
        coupon.minimumAmount,
        totalPrice,
        isRemoteArea
      );
    }

    case "BOGO": {
      if (coupon.discountType !== "buyXgetY") return false;
      return isValidBogo(selectedCartItems, coupon.buyQuantity);
    }

    case "FIXED5000": {
      if (coupon.discountType !== "fixed") return false;
      return isValidFixed5000(coupon.minimumAmount, totalPrice);
    }

    case "MIRACLESALE": {
      if (coupon.discountType !== "percentage") return false;
      return isValidMiracleSale(coupon.availableTime);
    }
  }
};

const isValidFixed5000 = (minimumAmount: number, totalPrice: number) => {
  return minimumAmount <= totalPrice;
};

const isValidFreeShipping = (
  minimumAmount: number,
  totalPrice: number,
  isRemoteArea: boolean
) => {
  if (getDeliveryPrice({ orderPrice: totalPrice, isRemoteArea }) === 0)
    return false;
  if (minimumAmount > totalPrice) return false;
  return true;
};

const isValidBogo = (selectedCartItems: CartProduct[], buyQuantity: number) => {
  return selectedCartItems.some(
    (item: CartProduct) => item.quantity > buyQuantity!
  );
};

const isValidMiracleSale = (availableTime: { start: string; end: string }) => {
  if (availableTime && !isValidTime(availableTime)) return false;
  return true;
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
      return calculateBuyXGetY(selectedCartItems, coupon.buyQuantity);
    }

    case "freeShipping": {
      return getDeliveryPrice({
        orderPrice: totalPrice,
        isRemoteArea,
      });
    }

    case "percentage":
      return (totalPrice * coupon.discount) / 100;

    default:
      return 0;
  }
};

const calculateBuyXGetY = (
  selectedCartItems: CartProduct[],
  buyQuantity: number
) => {
  const eligibleItems = selectedCartItems.filter(
    (item: CartProduct) => item.quantity > buyQuantity
  );

  eligibleItems.sort(
    (a: CartProduct, b: CartProduct) => b.product.price - a.product.price
  );

  return eligibleItems[0].product.price;
};
