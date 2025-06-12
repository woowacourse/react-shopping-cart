import { CartItem, Coupon } from '../types';
import applyCouponsToItems from './applyCouponsToItems';

const getMaxDiscountCoupons = (
  cartItems: CartItem[],
  coupons: Coupon[],
  deliveryPrice: number,
  couponAmount: number
) => {
  let maxDiscountCoupons: Coupon[] = [];

  if (coupons.length < couponAmount) return coupons;

  let maxDiscountPrice = 0;
  const visited = new Array(coupons.length).fill(false);

  const DFS = (idx: number, usedCoupons: Coupon[]) => {
    if (idx >= couponAmount) {
      const discountPrice = applyCouponsToItems(cartItems, deliveryPrice, usedCoupons);
      if (discountPrice > maxDiscountPrice) {
        maxDiscountCoupons = [...usedCoupons];
        maxDiscountPrice = discountPrice;
      }
      return;
    }

    for (let i = 0; i < coupons.length; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      usedCoupons.push(coupons[i]);
      DFS(idx + 1, usedCoupons);
      usedCoupons.pop();
      visited[i] = false;
    }
  };

  DFS(0, []);

  return maxDiscountCoupons;
};

export default getMaxDiscountCoupons;
