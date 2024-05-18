import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart/atoms';
import { selector } from 'recoil';

export const orderCostsSelector = selector({
  key: 'orderCostsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const selectedIds = get(selectedIdsAtom);

    const selectedCartItems = cartItems.filter(({ id }) => selectedIds.includes(id));

    const orderPrice = selectedCartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

    const { freeShippingMinAmount, shippingFee } = PRICE;

    const shippingPrice =
      orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;

    const totalPrice = orderPrice + shippingPrice;

    return { orderPrice, shippingPrice, totalPrice };
  },
});
