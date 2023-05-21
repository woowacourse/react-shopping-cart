import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { MIN_QUANTITY } from "constants/cartProduct";
import { CartProduct } from "types/domain";
import { getCartItems } from "api/cartItems";

const getCartProductList = selector<CartProduct[]>({
  key: "getCartProductList",
  get: async () => {
    const cartItems = await getCartItems();

    return cartItems.map((item) => {
      const cartProduct: CartProduct = {
        ...item,
        isChecked: true,
      };

      return cartProduct;
    });
  },
});

const { persistAtom } = recoilPersist();

export const cartListState = atom<CartProduct[]>({
  key: "cartList",
  default: getCartProductList,
  effects_UNSTABLE: [persistAtom],
});

export const cartSelector = selectorFamily<CartProduct | null, number>({
  key: "cartSelector",
  get:
    (id) =>
    ({ get }) =>
      get(cartListState).find((product) => product.id === id) ?? null,
  set:
    (id) =>
    ({ get, set }, newProduct) => {
      if (newProduct instanceof DefaultValue) return;

      const cartList = [...get(cartListState)];
      const index = cartList.findIndex((product) => product.id === id);

      if (!newProduct || newProduct.quantity <= MIN_QUANTITY) {
        index !== -1 && cartList.splice(index, 1);

        return set(cartListState, cartList);
      }

      if (index !== -1) cartList[index] = newProduct;
      if (index === -1) cartList.push(newProduct);

      return set(cartListState, cartList);
    },
});

export const cartTotalPrice = selector({
  key: "cartTotalPrice",
  get: ({ get }) =>
    get(cartListState)
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0),
});
