import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  checkedState,
  targetCheckedSelector,
} from '../states/checkedCartProducts';
import {
  addCartProductChecked,
  deleteCartProductChecked,
} from '../states/checkedCartProducts/utils';

const useChecked = (id: number) => {
  const targetChecked = useRecoilValue(targetCheckedSelector(id));
  const setChecked = useSetRecoilState(checkedState);

  const updateChecked = (isChecked: boolean) => {
    if (isChecked) {
      setChecked((prev) => addCartProductChecked(prev, id));
      return;
    }

    setChecked((prev) => deleteCartProductChecked(prev, id));
  };

  const deleteChecked = () => {
    setChecked((prev) => deleteCartProductChecked(prev, id));
  };

  return { targetChecked, updateChecked, deleteChecked };
};

export default useChecked;
