import { useRecoilValue, useSetRecoilState } from 'recoil';

import { checkedState } from '../states/checkedCartProducts';
import { targetCheckedState } from '../states/checkedCartProducts/selector';
import { useEffect } from 'react';

const useChecked = (id: number) => {
  const targetChecked = useRecoilValue(targetCheckedState(id));
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

  useEffect(() => {
    if (targetChecked) return;

    setChecked((prev) => [...prev, { id, isChecked: false }]);
  }, [id, setChecked, targetChecked]);

  return { targetChecked, updateChecked, deleteChecked };
};

export default useChecked;
