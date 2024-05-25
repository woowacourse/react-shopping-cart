import { selector } from 'recoil';
import { fetchCartItems } from '../api/shoppingCart';
import { fetchCoupons } from '../api/coupons';

export const fetchedCartItemsSelector = selector({
  key: 'fetchedCartItemsSelector',
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const fetchedCouponsSelector = selector({
  key: 'fetchedCouponsSelector',
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
