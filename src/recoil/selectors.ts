import { selector } from 'recoil';
import { cartData, cartItemCheckState } from './atoms';
import { fetchCartItem, fetchCoupon } from '../api';

export const fetchCartData = selector<Cart[]>({
  key: 'fetchCartData',
  get: async () => {
    const cartData = await fetchCartItem();
    return cartData;
  },
});

export const allCartItemsCheckState = selector<boolean>({
  key: 'allCartItemsCheckState',
  get: ({ get }) => {
    const cart = get(cartData);
    return cart.every((cartItem) => get(cartItemCheckState(cartItem.id)));
  },
  set: ({ set, get }, newValue) => {
    const cart = get(cartData);
    cart.forEach((cartItem) => {
      set(cartItemCheckState(cartItem.id), newValue);
    });
  },
});

export const checkedCartItems = selector({
  key: 'checkedCartItems',
  get: ({ get }) => {
    const cart = get(cartData);
    const isCheckedCartItems = cart.filter((cartItem) =>
      get(cartItemCheckState(cartItem.id)),
    );
    return isCheckedCartItems;
  },
});

export const calculateOrderPrice = selector<Price>({
  key: 'calculateOrderPrice',
  get: ({ get }) => {
    const checkedCart = get(checkedCartItems);
    const totalOrderPrice = checkedCart.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
    const deliveryFee =
      totalOrderPrice >= 100000 || totalOrderPrice === 0 ? 0 : 3000;
    const totalPrice = totalOrderPrice + deliveryFee;

    return { totalOrderPrice, deliveryFee, totalPrice };
  },
});

export const fetchCouponList = selector<Coupon[]>({
  key: 'fetchCouponList',
  get: async () => {
    const couponData = await fetchCoupon();
    return couponData;
  },
});
