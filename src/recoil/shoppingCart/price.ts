import { PRICE } from '@constants/shippingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart/cartItems';
import { quantityAtomFamily } from '@recoil/shoppingCart/quantity';
import { selector } from 'recoil';

export const orderPriceSelector = selector({
  key: 'orderPriceSelector',
  get: ({ get }) => {
    const selectedCartItems = get(selectedItemsSelector);

    return selectedCartItems.reduce((acc, { id, product }) => {
      const quantity = get(quantityAtomFamily(id));
      return acc + product.price * quantity;
    }, 0);
  },
});

export const shippingPriceSelector = selector({
  key: 'shippingPriceSelector',
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);

    const { freeShippingMinAmount, shippingFee } = PRICE;

    const shippingPrice =
      orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;

    return shippingPrice;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingPrice = get(shippingPriceSelector);

    return orderPrice + shippingPrice;
  },
});
