import { calculateDiscountAmount } from '@domain/discount';
import { selectedCouponListAtom } from '@recoil/orderConfirm/coupon';
import { orderPriceSelector, shippingPriceSelector } from '@recoil/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart/cartItems';
import { selector } from 'recoil';

export const totalDiscountPriceSelector = selector({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListAtom);
    const shippingPrice = get(shippingPriceSelector);
    const selectedCartItems = get(selectedItemsSelector);
    const orderPrice = get(orderPriceSelector);

    return selectedCouponList.reduce(
      (prevDiscountPrice, coupon) =>
        calculateDiscountAmount({ coupon, shippingPrice, orderPrice, selectedCartItems }) + prevDiscountPrice,
      0,
    );
  },
});
