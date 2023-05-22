import {atom, selector, selectorFamily} from 'recoil';
import {CartItem} from '../types/types';
import {fetchUpdateCart} from "../api/api.ts";

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    return cartList.length;
  }
});

export const checkedCartSelector = selector({
  key: 'checkedCartSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  }
});

export const checkedCartCountSelector = selector({
  key: 'checkedCartCountSelector',
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  }
});

export const allCartCheckedSelector = selector({
  key: 'allCartCheckedSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every((cartItem) => cartItem.checked);
      return isAllCartItemChecked;
    }

    return false;
  }
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce((acc, cartItem) => acc + (cartItem.quantity * cartItem.product.price), 0);
    return totalPrice;
  }
});

export const quantityByProductIdSelector = selectorFamily({
  key: 'quantityByProductIdSelector',
  get: (productId: number) => ({get}) => {
    const cartList = get(cartState);
    const targetCart = cartList.find((cart) => cart.id === productId);
    return targetCart?.quantity ?? 0;
  },
});

/**
 * TODO: 카드 수가 0개일 때 제거하는 로직 추가 필요
 */
export const updateCartListQuantitySelector = selectorFamily<number, number>({
  key: 'updateCartListQuantitySelector',
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: (productId) => ({get, set}, newQuantity) => {
    const cartList = get(cartState);
    const targetIndex = cartList.findIndex((cartItem) => cartItem.id === productId);

    if (targetIndex !== -1) {
      const updatedCartList = [...cartList];
      updatedCartList[targetIndex] = {...updatedCartList[targetIndex], quantity: newQuantity as number};
      set(cartState, updatedCartList);

      fetchUpdateCart(productId, newQuantity as number);
    }
  },
});

