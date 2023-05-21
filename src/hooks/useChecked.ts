import { useRecoilValue, useSetRecoilState } from 'recoil';

import { checkedState } from '../states/checkedCartProducts';
import { targetCheckedState } from '../states/checkedCartProducts/selector';

const useChecked = (id: number) => {
  const isTargetChecked = useRecoilValue(targetCheckedState(id));
  const setChecked = useSetRecoilState(checkedState);

  const updateChecked = (isChecked: boolean) => {
    setChecked((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, isChecked };
      })
    );
  };

  const deleteChecked = () => {
    setChecked((prev) => prev.filter((item) => item.id !== id));
  };

  return { isTargetChecked, updateChecked, deleteChecked };
};

export default useChecked;
