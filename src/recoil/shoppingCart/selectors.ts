import { fetchCartItems } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, quantityAtomFamily, selectedIdsAtom } from '@recoil/shoppingCart/atoms';
import { selector, selectorFamily } from 'recoil';

export const cartItemsSelector = selector<CartItem[]>({
  key: 'cartItemsSelector',
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const quantitySelectorFamily = selectorFamily<number, number>({
  key: 'quantitySelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      const cartItems = get(cartItemsAtom);
      return cartItems.find((item) => item.id === id)?.quantity ?? 1;
    },
});

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

    return orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;
  },
});

export const selectedItemsSelector = selector({
  key: 'selectedItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);

    const selectedItems = cartItems
      .filter((cartItem) => get(selectedIdsAtom).has(cartItem.id))
      .map((item) => ({ ...item, quantity: get(quantityAtomFamily(item.id)) }));

    return selectedItems;
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
