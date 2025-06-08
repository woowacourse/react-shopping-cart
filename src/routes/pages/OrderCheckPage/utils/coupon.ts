import { CartItemProps } from '../../../../types/cartItem';

export function getAvailableCoupons({
  selectedCartData,
  totalPrice,
  deliveryFee,
}: {
  selectedCartData: CartItemProps[];
  totalPrice: number;
  deliveryFee: number;
}) {
  const availableCoupons = [];
  const maxQuantity = Math.max(
    ...selectedCartData.map((item) => item.quantity)
  );
  const currentTime = new Date().getHours();

  if (isFixedDiscount(totalPrice)) {
    availableCoupons.push('FIXED5000');
  }

  if (isFreeShipping(totalPrice, deliveryFee)) {
    availableCoupons.push('FREESHIPPING');
  }

  if (isBogo(maxQuantity)) {
    availableCoupons.push('BOGO');
  }

  if (isMiracleMorning(currentTime)) {
    availableCoupons.push('MIRACLESALE');
  }

  return availableCoupons;
}

export function isMiracleMorning(currentTime: number) {
  return currentTime >= 4 && currentTime <= 7;
}

export function isBogo(maxQuantity: number) {
  return maxQuantity >= 3;
}

export function isFreeShipping(totalPrice: number, deliveryFee: number) {
  return totalPrice >= 50000 && deliveryFee > 0;
}

export function isFixedDiscount(totalPrice: number) {
  return totalPrice >= 100000;
}

export function calculateCouponDiscount({
  totalPrice,
  deliveryFee,
  discountableProducts,
  selectedCoupon,
}: {
  totalPrice: number;
  deliveryFee: number;
  discountableProducts: CartItemProps[];
  selectedCoupon: Set<string>;
}) {
  let totalDiscount = 0;

  if (selectedCoupon.has('MIRACLESALE')) {
    totalDiscount += totalPrice * 0.3;
  }

  if (selectedCoupon.has('BOGO')) {
    const mostExpensiveProductPrice = Math.max(
      ...discountableProducts.map((item) => item.product.price)
    );
    totalDiscount += mostExpensiveProductPrice;
  }

  if (selectedCoupon.has('FIXED5000')) {
    totalDiscount += 5000;
  }

  if (selectedCoupon.has('FREESHIPPING')) {
    totalDiscount += deliveryFee;
  }

  return totalDiscount;
}
