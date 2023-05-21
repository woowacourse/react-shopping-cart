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

export const checkedCartProductState = selector<CartProductWithChecked[]>({
  key: 'checkedCartProductState',
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

export const targetCheckedState = selectorFamily({
  key: 'targetCheckedState',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetChecked(get(checkedState), id),
});

export const checkedCartProductCountState = selector({
  key: 'checkedCartProductCountState',
  get: ({ get }) =>
    filterCartProductChecked(get(checkedCartProductState), true).length,
});

export const checkedPriceState = selector({
  key: 'checkedPriceState',
  get: ({ get }) => getCheckedPrice(get(checkedCartProductState)),
});
