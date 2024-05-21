import { selector } from 'recoil';
import { cartItemsState, selectedItemsState } from '../atoms/atoms';
import { DELIVERY_INFO } from '../../constants/cart';

export const categoryCountState = selector<number>({
  key: 'categoryCountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.length;
  },
});

export const selectedItemsCountState = selector<number>({
  key: 'selectedItemsCountState',
  get: ({ get }) => {
    const selectedItems = get(selectedItemsState);
    return Object.values(selectedItems).filter(
      (item) => item.isSelected === true,
    ).length;
  },
});

export const selectedItemsTotalQuantityState = selector<number>({
  key: 'selectedItemsTotalQuantityState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedItems = get(selectedItemsState);
    const selectedItemsTotalQuantity = cartItems.reduce((total, item) => {
      if (selectedItems[item.id].isSelected) {
        return total + item.quantity;
      }
      return total;
    }, 0);
    return selectedItemsTotalQuantity;
  },
});

export const orderPriceState = selector<number>({
  key: 'orderPriceState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedItems = get(selectedItemsState);
    const orderPrice = cartItems.reduce((total, item) => {
      if (selectedItems[item.id].isSelected) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
    return orderPrice;
  },
});

export const deliveryPriceState = selector<number>({
  key: 'deliveryPriceState',
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const deliveryPrice =
      orderPrice > DELIVERY_INFO.FREE_DELIVERY_THRESHOLD || orderPrice === 0
        ? 0
        : DELIVERY_INFO.DELIVERY_AMOUT;
    return deliveryPrice;
  },
});

export const totalPriceState = selector<number>({
  key: 'totalPriceState',
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const deliveryPrice = get(deliveryPriceState);
    return orderPrice + deliveryPrice;
  },
});
