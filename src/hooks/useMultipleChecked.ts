import type { ChangeEventHandler } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  allCheckedSelector,
  allUncheckedSelector,
  checkedState,
} from '../states/checkedCartProducts';
import { cartProductState } from '../states/cartProducts';
import { findTargetChecked } from '../states/checkedCartProducts/utils';

const useMultipleChecked = () => {
  const [checked, setChecked] = useRecoilState(checkedState);
  const resetChecked = useResetRecoilState(checkedState);
  const setCartProducts = useSetRecoilState(cartProductState);

  const isAllChecked = useRecoilValue(allCheckedSelector);
  const isAllUnchecked = useRecoilValue(allUncheckedSelector);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.checked) {
      resetChecked();
      return;
    }

    setChecked([]);
  };

  const deleteCheckedProducts = async () => {
    try {
      await Promise.all(checked.map((id) => cartProductApis.delete(id)));
      setCartProducts((prev) =>
        prev.filter(
          (cartProduct) => !findTargetChecked(checked, cartProduct.id)
        )
      );
      setChecked([]);
    } catch {
      alert('장바구니에서 삭제하는데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};

export default useMultipleChecked;
