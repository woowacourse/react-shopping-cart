import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { checkedListState, initialListState } from '../../store/checkbox';

const useCheckboxList = (key: string) => {
  const setInitialList = useSetRecoilState(initialListState(key));
  const setCheckedList = useSetRecoilState(checkedListState(key));

  const setInitialCheckedList = useCallback(
    (initialList: number[]) => {
      setInitialList(initialList);
      setCheckedList(new Set(initialList));
    },
    [setCheckedList, setInitialList]
  );

  return { setInitialCheckedList };
};

export { useCheckboxList };
