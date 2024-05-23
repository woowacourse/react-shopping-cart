import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, maxDiscountAtom, selectedIdsAtom, surchargeShippingFeeAtom } from '@recoil/shoppingCart/atoms';
import { selector } from 'recoil';

export const orderPriceSelector = selector({
  key: 'orderPriceSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const selectedIds = get(selectedIdsAtom);
    const selectedCartItems = cartItems.filter(({ id }) => selectedIds.includes(id));

    return selectedCartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  },
});

export const shippingFeeSelector = selector({
  key: 'shippingFeeSelector',
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const surchargeShippingFee = get(surchargeShippingFeeAtom);

    const { freeShippingMinAmount, shippingFee } = PRICE;
    const feeByOrderPrice =
      orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;
    return feeByOrderPrice + surchargeShippingFee;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    const maxDiscount = get(maxDiscountAtom);

    return orderPrice + shippingFee - maxDiscount;
  },
});
