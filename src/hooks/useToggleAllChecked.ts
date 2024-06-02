import { useState } from 'react';
import { useRecoilState } from 'recoil';
import areAllItemsChecked from '@utils/areAllItemsChecked';
import { cartItemsCheckedState } from '@store/productStore';

const useToggleAllChecked = () => {
  const [isCheckedMap, setIsCheckedMap] = useRecoilState(cartItemsCheckedState);
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
