import { CartItemProps } from '../../../../types/cartItem';

export function getAvailableCoupons({
  selectedCartData,
  totalPrice,
}: {
  selectedCartData: CartItemProps[];
  totalPrice: number;
}) {
  const availableCoupons = [];
  const maxQuantity = Math.max(
    ...selectedCartData.map((item) => item.quantity)
  );
  const currentTime = new Date().getHours();

  if (totalPrice >= 100000) {
    availableCoupons.push('FIXED5000');
  }

  if (totalPrice >= 50000 && totalPrice < 100000) {
    availableCoupons.push('FREESHIPPING');
  }

  if (maxQuantity >= 3) {
    availableCoupons.push('BOGO');
  }

  if (currentTime >= 4 && currentTime <= 7) {
    availableCoupons.push('MIRACLESALE');
  }

  return availableCoupons;
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

  if (selectedCoupon.has('BOGO')) {
    const mostExpensiveProductPrice = Math.max(
      ...discountableProducts.map((item) => item.product.price)
    );
    totalDiscount += mostExpensiveProductPrice;
  }

  if (selectedCoupon.has('FIXED5000')) {
    totalDiscount += 5000;
  }

  if (selectedCoupon.has('MIRACLESALE')) {
    totalDiscount += totalPrice * 0.3;
  }

  if (selectedCoupon.has('FREESHIPPING')) {
    totalDiscount += deliveryFee;
  }

  return totalDiscount;
}
