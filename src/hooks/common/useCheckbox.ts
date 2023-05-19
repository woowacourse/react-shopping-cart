import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { checkedItemState } from '../../store/checkbox';

const useCheckbox = (key: string, id: number) => {
  const [isChecked, setIsChecked] = useRecoilState(checkedItemState({ key, id }));

  const toggleItemCheckbox = useCallback(() => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  }, [setIsChecked]);

  return {
    isChecked,
    toggleItemCheckbox,
  };
};

export { useCheckbox };
