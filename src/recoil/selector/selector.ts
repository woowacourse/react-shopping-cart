import { selector } from 'recoil';
import {
  cartItemsState,
  previewSelectedCouponsState,
  selectedItemsState,
} from '../atoms/atoms';
import { DELIVERY_INFO } from '../../constants/cart';
import { calculateDiscountAmount } from '../../utils/calculateDiscountAmount';

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
    return selectedItems.length;
  },
});

export const selectedItemsTotalQuantityState = selector<number>({
  key: 'selectedItemsTotalQuantityState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedItems = get(selectedItemsState);
    const selectedItemsTotalQuantity = cartItems.reduce((total, item) => {
      const isSelected = selectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      );
      if (isSelected) {
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
      const isSelected = selectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      );
      if (isSelected) {
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

export const totalDiscountAmountState = selector<number>({
  key: 'totalDiscountAmountState',
  get: ({ get }) => {
    const previewSelectedCoupons = get(previewSelectedCouponsState);
    const { getCouponDiscountValueByType } = calculateDiscountAmount();

    const percentageCoupons = previewSelectedCoupons.filter(
      (coupon) => coupon.discountType === 'percentage',
    );
    const otherCoupons = previewSelectedCoupons.filter(
      (coupon) => coupon.discountType !== 'percentage',
    );
    percentageCoupons.sort((a, b) => (b.discount || 0) - (a.discount || 0));

    const sortedSelectedCoupons = [...percentageCoupons, ...otherCoupons];

    const totalDiscountAmount = sortedSelectedCoupons.reduce(
      (total, coupon) => total + getCouponDiscountValueByType(coupon),
      0,
    );

    return totalDiscountAmount;
  },
});
