import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart/atoms';
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
    const { freeShippingMinAmount, shippingFee } = PRICE;

    return orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    return orderPrice + shippingFee;
  },
});
