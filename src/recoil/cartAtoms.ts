import { atom, selector, selectorFamily } from "recoil";
import {
  CartItem,
  NewCartItem,
  ProductItem,
  ReceivedCartItem,
} from "../types/types";
import { fetchAddCart, fetchDeleteCart, fetchUpdateCart } from "../api/api.ts";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const cartCountSelector = selector({
  key: "cartCountSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const checkedCartSelector = selector({
  key: "checkedCartSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  },
});

export const checkedCartCountSelector = selector({
  key: "checkedCartCountSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: "allCartCheckedSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every(
        (cartItem) => cartItem.checked
      );
      return isAllCartItemChecked;
    }

    return false;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
      0
    );
    return totalPrice;
  },
});

export const quantityByProductIdSelector = selectorFamily({
  key: "quantityByProductIdSelector",
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartState);
      const targetCart = cartList.find((cart) => cart.id === productId);
      return targetCart?.quantity ?? 0;
    },
});

export const addCartItemSelector = selectorFamily<ProductItem, undefined>({
  key: "addCartItemSelector",
  get: () => (): ProductItem => {
    return { id: 0, imageUrl: "", name: "", price: 0 };
  },
  set:
    () =>
    ({ get, set }, newProductItem) => {
      const product = newProductItem as ProductItem;
      const cartList = get(cartState);
      const isCartItemExist = cartList.some(
        (cartItem) => cartItem.id === product.id
      );

      if (!isCartItemExist) {
        const newCartItem: NewCartItem = {
          id: product.id,
          quantity: 1,
          checked: true,
          product,
        };
        const updatedCartList = [...cartList, newCartItem];
        set(cartState, updatedCartList);
        fetchAddCart(newCartItem.id);
      }
    },
});

export const updateCartItemQuantitySelector = selectorFamily<number, number>({
  key: "updateCartItemQuantitySelector",
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set:
    (productId) =>
    ({ get, set }, newQuantity) => {
      const quantity = newQuantity as number;

      if (quantity === 0) {
        const id = productId as number;
        const cartList = get(cartState);
        if (confirm("정말로 삭제하시겠습니까?")) {
          const removedCartList = cartList.filter((cart) => cart.id !== id);
          set(cartState, removedCartList);
          fetchDeleteCart(id);
        }
      } else {
        const cartList = get(cartState);
        const targetIndex = cartList.findIndex(
          (cartItem) => cartItem.id === productId
        );

        if (targetIndex !== -1) {
          const updatedCartList = [...cartList];
          updatedCartList[targetIndex] = {
            ...updatedCartList[targetIndex],
            quantity,
          };
          set(cartState, updatedCartList);

          fetchUpdateCart(productId, newQuantity as number);
        }
      }
    },
});

export const removeCartItemSelector = selectorFamily<number, undefined>({
  key: "removeCartItemSelector",
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set:
    () =>
    ({ get, set }, productId) => {
      const id = productId as number;
      const cartList = get(cartState);
      if (confirm("정말로 삭제하시겠습니까?")) {
        const removedCartList = cartList.filter((cart) => cart.id !== id);
        set(cartState, removedCartList);
        fetchDeleteCart(id);
      }
    },
});

export const removeCartItemsSelector = selector<undefined>({
  key: "removeCartItemsSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = get(cartState);
    const checkedCartList = get(checkedCartSelector);
    if (confirm("정말로 삭제하시겠습니까?")) {
      const targetIds = checkedCartList.map((cartList) => cartList.id);
      const removedCartList = cartList.filter(
        (cart) => !targetIds.includes(cart.id)
      );
      set(cartState, removedCartList);
      targetIds.forEach((id) => {
        fetchDeleteCart(id);
      });
    }
  },
});

export const switchCartCheckboxSelector = selector<number>({
  key: "switchCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: ({ get, set }, id) => {
    const cartList = [...get(cartState)];
    const targetIndex = cartList.findIndex(
      (cartItem) => cartItem.id === (id as number)
    );
    const targetCart = cartList[targetIndex];
    const updatedCart = {
      ...targetCart,
      checked: !targetCart.checked,
    };
    cartList[targetIndex] = updatedCart;
    set(cartState, cartList);
  },
});

export const switchAllCartCheckboxSelector = selector<undefined>({
  key: "switchAllCartCheckboxSelector",
  get: () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return undefined;
  },
  set: ({ get, set }) => {
    const cartList = [...get(cartState)];
    const isAllCartItemChecked = get(allCartCheckedSelector);
    const newCartList = cartList.map((cartItem: ReceivedCartItem) => ({
      ...cartItem,
      checked: !isAllCartItemChecked,
    }));
    set(cartState, newCartList);
  },
});
