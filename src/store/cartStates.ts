import CheckedCartItemStorage from '@/services/CheckedProductStorage';
import { selector, selectorFamily, atom } from 'recoil';
import { deliveryFeeSelector } from './ShippingStates';
import { fetchCartItems } from '@/api';
import formatCartItems from '@/services/formatCartItem';
import { CartItemData } from '@/types';

export const allCartItemStates = atom<CartItemData[]>({
  key: 'allCartItemStates',
  default: selector({
    key: 'cartItemsSelector',
    get: async () => {
      const cartItems = await fetchCartItems();
      const formattedCartItems = formatCartItems(cartItems);
      const checkedProductIds = CheckedCartItemStorage.getCheckedProductIds();
      return formattedCartItems.map((item) => ({
        ...item,
        product: {
          ...item.product,
          isChecked: checkedProductIds.includes(item.id),
        },
      }));
    },
  }),
  effects: [
    ({ setSelf, onSet }) => {
      onSet((newValue, _, isReset) => {
        if (isReset) {
          CheckedCartItemStorage.clearCheckedProductIds();
        } else {
          const checkedProductIds = newValue
            .filter((item) => item.product.isChecked)
            .map((item) => item.id);
          CheckedCartItemStorage.setCheckedProductIds(checkedProductIds);
        }
      });
    },
  ],
});

export const totalCartItemsSelector = selector({
  key: 'totalCartItems',
  get: ({ get }) => {
    return get(allCartItemStates);
  },
});

export const isAllCheckedCartItemsSelector = selector({
  key: 'allCheckedCartItems',
  get: ({ get }) => {
    const allCartItems = get(allCartItemStates);
    return allCartItems.every((cartItem) => cartItem.product.isChecked);
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
      const updatedCartItems = allCartItems.map((item) =>
        item.id === id
          ? { ...item, product: { ...item.product, isChecked: !item.product.isChecked } }
          : item,
      );
      set(allCartItemStates, updatedCartItems);
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
