import { fetchCartItems } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart/atoms';
import { selector } from 'recoil';

export const cartItemsSelector = selector<CartItem[]>({
  key: 'cartItemsSelector',
  get: async ({ get }) => {
    const prevCartItems = get(cartItemsAtom);

    if (prevCartItems.length > 0) return prevCartItems;

    const cartItems = await fetchCartItems();

    return cartItems;
  },

  set: ({ set }, newValue) => {
    set(cartItemsAtom, newValue);
  },
});

export const orderCostsSelector = selector({
  key: 'orderCostsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsSelector);
    const selectedIds = get(selectedIdsAtom);

    const selectedCartItems = cartItems.filter(({ id }) => selectedIds.has(id));

    const orderPrice = selectedCartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

    const { freeShippingMinAmount, shippingFee } = PRICE;

    const shippingPrice =
      orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;

    const totalPrice = orderPrice + shippingPrice;

    return { orderPrice, shippingPrice, totalPrice };
  },
});
