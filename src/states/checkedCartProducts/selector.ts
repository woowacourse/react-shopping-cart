import { selector, selectorFamily } from 'recoil';

import { checkedState } from './atom';
import { cartProductCountSelector, cartProductState } from '../cartProducts';
import { findTargetChecked, getCheckedPrice } from './utils';

export const checkedCartProductSelector = selector({
  key: 'checkedCartProductSelector',
  get: ({ get }) => {
    const checked = get(checkedState);
    return get(cartProductState).filter((cartProduct) =>
      checked.includes(cartProduct.id)
    );
  },
});

export const targetCheckedSelector = selectorFamily({
  key: 'targetCheckedSelector',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetChecked(get(checkedState), id),
});

export const checkedCartProductCountSelector = selector({
  key: 'checkedCartProductCountSelector',
  get: ({ get }) => get(checkedState).length,
});

export const checkedPriceSelector = selector({
  key: 'checkedPriceSelector',
  get: ({ get }) => getCheckedPrice(get(checkedCartProductSelector)),
});

export const allCheckedSelector = selector({
  key: 'allCheckedSelector',
  get: ({ get }) =>
    get(checkedState).length > 0 &&
    get(checkedCartProductCountSelector) === get(cartProductCountSelector),
});

export const allUncheckedSelector = selector({
  key: 'allUncheckedSelector',
  get: ({ get }) => get(checkedCartProductCountSelector) === 0,
});
