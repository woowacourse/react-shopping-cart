import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isCheckedState } from '../store/atoms';
import areAllItemsChecked from '../utils/areAllItemsChecked';

const useToggleAllChecked = () => {
  const isCheckedMap = useRecoilValue(isCheckedState);
  const setIsCheckedMap = useSetRecoilState(isCheckedState);
  const [allChecked, setAllChecked] = useState(areAllItemsChecked(isCheckedMap));

  const handleToggleAll = () => {
    const newAllChecked = !allChecked;
    const newIsCheckedMap = { ...isCheckedMap };

    Object.keys(newIsCheckedMap).forEach((key) => {
      newIsCheckedMap[Number(key)] = newAllChecked;
    });
    setAllChecked(newAllChecked);
    setIsCheckedMap(newIsCheckedMap);
  };

  return {
    handleToggleAll,
    allChecked,
    setAllChecked,
  };
};

export default useToggleAllChecked;
