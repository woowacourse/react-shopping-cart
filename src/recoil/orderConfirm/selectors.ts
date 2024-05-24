import { calculateDiscountAmount } from '@domain/discount';
import { selectedCouponListAtom } from '@recoil/orderConfirm/atoms';
import { orderPriceSelector, selectedItemsSelector, shippingPriceSelector } from '@recoil/shoppingCart';
import { selector } from 'recoil';

export const totalDiscountPriceSelector = selector({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListAtom);
    const shippingPrice = get(shippingPriceSelector);
    const selectedCartItems = get(selectedItemsSelector);
    const orderPrice = get(orderPriceSelector);

    return selectedCouponList.reduce((acc, coupon) => {
      const discountAmount = calculateDiscountAmount({
        coupon,
        selectedCartItems,
        shippingPrice,
        orderPrice,
      });
      return acc + discountAmount;
    }, 0);
  },
});
