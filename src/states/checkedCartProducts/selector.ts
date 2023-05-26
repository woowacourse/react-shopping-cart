import { selector, selectorFamily } from 'recoil';

import { checkedState } from './atom';
import { cartProductState } from '../cartProducts';
import {
  filterCartProductChecked,
  findTargetChecked,
  getCheckedPrice,
  updateCartProductChecked,
} from './utils';
import type { CartProductWithChecked } from './type';

export const checkedCartProductSelector = selector<CartProductWithChecked[]>({
  key: 'checkedCartProductSelector',
  get: ({ get }) => {
    const checked = get(checkedState);
    return get(cartProductState).map((cartProduct) =>
      updateCartProductChecked(
        cartProduct,
        findTargetChecked(checked, cartProduct.id)?.isChecked ?? false
      )
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
  get: ({ get }) =>
    filterCartProductChecked(get(checkedCartProductSelector), true).length,
});

export const checkedPriceSelector = selector({
  key: 'checkedPriceSelector',
  get: ({ get }) => getCheckedPrice(get(checkedCartProductSelector)),
});
