import CheckedCartItemStorage from '@/services/CheckedProductStorage';
import { selector, selectorFamily } from 'recoil';
import { allCartItemStates } from './atoms';

export const totalCartItemsSelector = selector({
  key: 'totalCartItems',
  get: ({ get }) => {
    return get(allCartItemStates).filter((cartItem) => cartItem.product.isChecked);
  },
});

export const isAllCheckedCartItemsSelector = selector({
  key: 'allCheckedCartItems',
  get: ({ get }) => {
    const isAllChecked = get(allCartItemStates).every((cartItem) => cartItem.product.isChecked);
    return isAllChecked;
  },
  set: ({ get, set }) => {
    const allCartItems = get(allCartItemStates);
    const allChecked = allCartItems.every((cartItem) => cartItem.product.isChecked);

    const updatedCartItems = allCartItems.map((cartItem) => ({
      ...cartItem,
      product: {
        ...cartItem.product,
        isChecked: !allChecked,
      },
    }));

    set(allCartItemStates, updatedCartItems);

    if (!allChecked) {
      const checkedProductIds = updatedCartItems.map((cartItem) => cartItem.id);
      CheckedCartItemStorage.setCheckedProductIds(checkedProductIds);
    } else {
      CheckedCartItemStorage.clearCheckedProductIds();
    }
  },
});

export const isCheckedIndividualCartItemSelector = selectorFamily<boolean, number>({
  key: 'isCheckedIndividualCartItem',
  get:
    (id: number) =>
    ({ get }) => {
      const allCartItems = get(allCartItemStates);
      const cartItem = allCartItems.find((item) => item.id === id);
      return cartItem ? cartItem.product.isChecked : false;
    },
  set:
    (id: number) =>
    ({ get, set }) => {
      const allCartItems = get(allCartItemStates);
      const updatedCartItem = allCartItems.map((item) =>
        item.id === id
          ? { ...item, product: { ...item.product, isChecked: !item.product.isChecked } }
          : item,
      );
      set(allCartItemStates, updatedCartItem);

      const checkedProductIds = updatedCartItem
        .filter((item) => item.product.isChecked)
        .map((item) => item.id);
      CheckedCartItemStorage.setCheckedProductIds(checkedProductIds);
    },
});

export const individualCartItemQuantitySelector = selectorFamily<number, number>({
  key: 'individualCartItemQuantity',
  get:
    (id: number) =>
    ({ get }) => {
      const allCartItems = get(allCartItemStates);
      const cartItem = allCartItems.find((item) => item.id === id);
      return cartItem ? cartItem.quantity : 0;
    },
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      const allCartItems = get(allCartItemStates);
      const updatedCartItems = allCartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: typeof newValue === 'number' ? newValue : item.quantity }
          : item,
      );
      set(allCartItemStates, updatedCartItems);
    },
});

export const orderAmountSelector = selector({
  key: 'orderAmount',
  get: ({ get }) => {
    const allCartItems = get(allCartItemStates);

    const totalAmount = allCartItems
      .filter((cartItem) => cartItem.product.isChecked)
      .reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
      }, 0);

    return totalAmount;
  },
});

export const deliveryFeeSelector = selector({
  key: 'deliveryFee',
  get: ({ get }) => {
    const FREE_SHIPPING_CONDITION = 100_000;
    const SHIPPING_FEE = 3000;
    const totalAmount = get(orderAmountSelector);

    return totalAmount >= FREE_SHIPPING_CONDITION ? 0 : SHIPPING_FEE;
  },
});

export const totalOrderAmountSelector = selector({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(orderAmountSelector) + get(deliveryFeeSelector);
  },
});

export const totalCategoryCountSelector = selector({
  key: 'totalCategoryCount',
  get: ({ get }) => {
    const allCartItems = get(allCartItemStates);
    const categorySet = new Set();

    allCartItems.forEach((cartItem) => {
      if (cartItem.product.isChecked) {
        categorySet.add(cartItem.product.category);
      }
    });

    return categorySet.size;
  },
});

export const totalOrderQuantitySelector = selector({
  key: 'totalOrderQuantity',
  get: ({ get }) => {
    const allCartItems = get(allCartItemStates);
    const checkCartItems = allCartItems.filter((cartItem) => cartItem.product.isChecked);

    return checkCartItems.reduce((acc, checkItem) => {
      return acc + checkItem.quantity;
    }, 0);
  },
});
