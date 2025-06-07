import { CartItemProps } from '../types/cartItem';
import { Coupon } from '../types/coupon';
import { simulateCombo } from '../utils/coupon';

const useCouponCombos = (
  checkedCoupons: number[],
  cartItem: CartItemProps[],
  couponList: Coupon[],
  subTotal: number,
  baseShippingFee: number
) => {
  const combos: Coupon[][] = [];

  if (checkedCoupons.length > 0) {
    const manualCoupons = couponList.filter((c) =>
      checkedCoupons.includes(c.id)
    );
    return simulateCombo(cartItem, manualCoupons, subTotal, baseShippingFee);
  }

  for (let i = 0; i < couponList.length; i++) {
    combos.push([couponList[i]]);
  }

  for (let i = 0; i < couponList.length; i++) {
    for (let j = i + 1; j < couponList.length; j++) {
      combos.push([couponList[i], couponList[j]]);
    }
  }

  const result = combos.map((combo) => {
    return simulateCombo(cartItem, combo, subTotal, baseShippingFee);
  });

  result.sort((a, b) => a.finalPayable - b.finalPayable);

  return result[0];
};

export default useCouponCombos;
