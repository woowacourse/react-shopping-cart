import { selector, selectorFamily } from 'recoil';

import { checkedState } from '../atom';
import { cartProductState } from '../../cartProducts';

export const checkedCartProductState = selector({
  key: 'checkedCartProductState',
  get: ({ get }) => {
    const checked = get(checkedState);
    return get(cartProductState).map((cartProduct) => ({
      ...cartProduct,
      isChecked:
        checked.find((item) => item.id === cartProduct.id)?.isChecked ?? false,
    }));
  },
});

export const targetCheckedState = selectorFamily({
  key: 'targetCheckedState',
  get:
    (id: number) =>
    ({ get }) =>
      get(checkedState).find((cartProduct) => cartProduct.id === id)
        ?.isChecked ?? false,
});

export const checkedCartProductCountState = selector({
  key: 'checkedCartProductCountState',
  get: ({ get }) =>
    get(checkedCartProductState).filter((product) => product.isChecked).length,
});

export const checkedPriceState = selector({
  key: 'checkedPriceState',
  get: ({ get }) =>
    get(checkedCartProductState).reduce(
      (acc, cur) =>
        cur.isChecked ? acc + cur.quantity * cur.product.price : acc,
      0
    ),
});
