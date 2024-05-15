import LocalStorage from '@/services/LocalStorage';
import { selector, selectorFamily } from 'recoil';
import { allCartItemStates } from './atoms';

export const isAllCheckedCartItems = selector({
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

    if (!allChecked) {
      const checkedProductIds = updatedCartItems.map((cartItem) => cartItem.id);
      LocalStorage.setCheckedProductIds(checkedProductIds);
    } else {
      LocalStorage.clearCheckedProductIds();
    }
    set(allCartItemStates, updatedCartItems);
  },
});

export const isCheckedIndividualCartItem = selectorFamily<boolean, number>({
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
      LocalStorage.setCheckedProductIds(checkedProductIds);
    },
});

export const individualCartItemQuantity = selectorFamily<number, number>({
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

export const orderAmount = selector({
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

export const deliveryFee = selector({
  key: 'deliveryFee',
  get: ({ get }) => {
    const FREE_SHIPPING_CONDITION = 100_000;
    const SHIPPING_FEE = 3000;
    const totalAmount = get(orderAmount);

    return totalAmount >= FREE_SHIPPING_CONDITION ? 0 : SHIPPING_FEE;
  },
});

export const totalOrderAmount = selector({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(orderAmount) + get(deliveryFee);
  },
});

export const totalCategoryCount = selector({
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

export const totalOrderQuantity = selector({
  key: 'totalOrderQuantity',
  get: ({ get }) => {
    const allCartItems = get(allCartItemStates);
    const checkCartItems = allCartItems.filter((cartItem) => cartItem.product.isChecked);

    return checkCartItems.reduce((acc, checkItem) => {
      return acc + checkItem.quantity;
    }, 0);
  },
});

export const totalProductQuantity = selector({
  key: 'totalProductQuantity',
  get: ({ get }) => {
    let totalCount = 0;
    let totalQuantity = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const test = localStorage.getItem(key) as string;
      const value = JSON.parse(test);

      if (value === true) {
        const quantity = get(productQuantityState(parseInt(key, 10)));
        totalCount++;
        totalQuantity += quantity;
      }
    }

    return {
      totalCount,
      totalQuantity,
    };
  },
});
