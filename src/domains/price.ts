import { CouponType, ResponseCartItem } from "../types/types";

export const calculateTotalPrice = (items: ResponseCartItem[]) => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const calculateShippingFee = (totalPrice: number) => {
  if (totalPrice >= 100000 || totalPrice === 0) {
    return 0;
  }
  return 3000;
};

export const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR");
};

export const calcTotalQuantity = (selectedCartItem: ResponseCartItem[]) => {
  return selectedCartItem.reduce((count, cart) => count + cart.quantity, 0);
};

export const calcDeliveryPrice = (
  totalPrice: number,
  isSelectJejuChecked: boolean
) => (totalPrice >= 100000 ? 0 : 3000) + (isSelectJejuChecked ? 3000 : 0);

export const getDiscountPriceByType = ({
  coupon,
  orderPrice,
  deliveryPrice,
  selectedCartItem,
}: {
  coupon: CouponType;
  orderPrice?: number;
  deliveryPrice?: number;
  selectedCartItem?: ResponseCartItem[];
}) => {
  if (coupon.discountType === "fixed") {
    return coupon.discount;
  } else if (coupon.discountType === "percentage") {
    if (!orderPrice) return 0;
    return Math.floor((orderPrice * coupon.discount) / 100);
  } else if (coupon.discountType === "freeShipping") {
    return deliveryPrice || 0;
  } else if (coupon.discountType === "buyXgetY") {
    if (!selectedCartItem) return 0;

    const moreThanMinimumQuantity = selectedCartItem
      .filter(
        (cart) => cart.quantity >= coupon.buyQuantity + coupon.getQuantity
      )
      .sort((a, b) => b.product.price - a.product.price);

    const discountQuantity = Math.floor(
      moreThanMinimumQuantity[0].quantity /
        (coupon.buyQuantity + coupon.getQuantity)
    );

    return moreThanMinimumQuantity[0].product.price * discountQuantity;
  }

  return 0;
};

export const getDiscountPrice = ({
  selectedCoupon,
  orderPrice,
}: {
  selectedCoupon: CouponType[];
  orderPrice: number;
}) => {
  if (selectedCoupon.length === 0) return 0;

  if (selectedCoupon.length === 1) {
    return getDiscountPriceByType({
      coupon: selectedCoupon[0],
      orderPrice,
    });
  }

  const firstCoupon = selectedCoupon[0];
  const secondCoupon = selectedCoupon[1];

  if (selectedCoupon.length === 2) {
    const applyFirstCoupon = getDiscountPriceByType({
      coupon: firstCoupon,
      orderPrice,
    });

    const applySecondCoupon = getDiscountPriceByType({
      coupon: secondCoupon,
      orderPrice: orderPrice - applyFirstCoupon,
    });

    const applyFirstCouponReverse = getDiscountPriceByType({
      coupon: secondCoupon,
      orderPrice,
    });
    const applySecondCouponReverse = getDiscountPriceByType({
      coupon: firstCoupon,
      orderPrice: orderPrice - applyFirstCouponReverse,
    });

    return Math.max(
      applyFirstCoupon + applySecondCoupon,
      applyFirstCouponReverse + applySecondCouponReverse
    );
  }
  return 0;
};
