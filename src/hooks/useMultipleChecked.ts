import type { ChangeEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { checkedState } from '../states/checkedCartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  filterCartProductChecked,
  findTargetChecked,
  getIsAllChecked,
  getIsAllUnchecked,
  updateCartProductChecked,
} from '../states/checkedCartProducts/utils';

const useMultipleChecked = () => {
  const [checked, setChecked] = useRecoilState(checkedState);
  const setCartProducts = useSetRecoilState(cartProductState);

  const isAllChecked = getIsAllChecked(checked);
  const isAllUnchecked = getIsAllUnchecked(checked);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setChecked((prev) =>
      prev.map((item) =>
        updateCartProductChecked(item, event.currentTarget.checked)
      )
    );
  };

  const deleteCheckedProducts = () => {
    setCartProducts((prev) =>
      prev.filter(
        (cartProduct) => !findTargetChecked(checked, cartProduct.id)?.isChecked
      )
    );
    setChecked((prev) => filterCartProductChecked(prev, false));

    checked.forEach((item) => {
      if (item.isChecked) cartProductApis.delete(item.id);
    });
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};

export default useMultipleChecked;
