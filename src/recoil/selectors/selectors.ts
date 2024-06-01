import { selector } from 'recoil';
import { cartData, cartItemCheckState, couponDiscountAmount, specialZoneCheckState } from '../atoms/atoms';
import { Price } from '../../types/cart';

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
    const isCheckedCartItems = cart.filter((cartItem) => get(cartItemCheckState(cartItem.id)));
    return isCheckedCartItems;
  },
});

export const calculateOrderPrice = selector<Price>({
  key: 'calculateOrderPrice',
  get: ({ get }) => {
    const checkedCart = get(checkedCartItems);
    const isSpecialZoneCheck = get(specialZoneCheckState);
    const couponDiscount = get(couponDiscountAmount);

    const totalOrderPrice = checkedCart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const specialZoneFee = checkedCart.length && isSpecialZoneCheck && totalOrderPrice < 100000 ? 3000 : 0;
    const deliveryFee = (totalOrderPrice >= 100000 || totalOrderPrice === 0 ? 0 : 3000) + specialZoneFee;

    const totalPrice = totalOrderPrice + deliveryFee - couponDiscount;

    return { totalOrderPrice, deliveryFee, totalPrice };
  },
});
