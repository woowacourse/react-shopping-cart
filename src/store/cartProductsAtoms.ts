import { atom, selector } from "recoil";
import type { CartLocalInfos } from "../types";

const cartLocalInfosAtom = atom<CartLocalInfos>({
  key: "cartInfosAtom",
  default: [],
});

const cartIsCheckedAtom = atom<Record<string, boolean>>({
  key: "cartIsCheckedAtom",
  default: { "-1": false },
});

const hideListAtom = atom<Record<string, boolean>>({
  key: "hideListAtom",
  default: {},
});

const cartProductsCountSelector = selector<number>({
  key: "cartProductsCountSelector",
  get: ({ get }) => {
    const cartInfos = get(cartLocalInfosAtom);
    return Object.values(cartInfos).filter(({ quantity }) => quantity > 0)
      .length;
  },
});

const totalPriceSelector = selector<number>({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const cartInfos = get(cartLocalInfosAtom);
    const isChecked = get(cartIsCheckedAtom);
    const hideList = get(hideListAtom);

    return Object.values(cartInfos).reduce(
      (totalPrice, { id, quantity, price }) =>
        totalPrice + (isChecked[id] && !hideList[id] ? quantity * price : 0),
      0
    );
  },
});

export {
  cartLocalInfosAtom,
  cartIsCheckedAtom,
  hideListAtom,
  cartProductsCountSelector,
  totalPriceSelector,
};
