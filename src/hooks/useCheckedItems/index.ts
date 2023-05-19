import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import shoppingCartItemsIdState from '@Selector/shoppingCartItemsIdState';

const useCheckedItems = () => {
  const itemsId = useRecoilValue(shoppingCartItemsIdState);
  const [checkedItemsId, setCheckedItemsId] = useState<number[]>(itemsId);
  const parentCheckbox = useRef(true);

  const updateEachItemCheckStatus = (id: number) => {
    return () => {
      if (checkedItemsId.includes(id)) {
        parentCheckbox.current = false;
        setCheckedItemsId(checkedItemsId.filter((itemID) => itemID !== id));
      } else {
        if (itemsId.length === checkedItemsId.length + 1) parentCheckbox.current = true;
        setCheckedItemsId([...checkedItemsId, id]);
      }
    };
  };

  const updateAllItemCheckState = (state: 'check' | 'uncheck') => {
    if (state === 'check') return setCheckedItemsId(itemsId);
    setCheckedItemsId([]);
  };

  useEffect(() => {
    const isAllItemSelect = new Set([...itemsId, ...checkedItemsId]).size === itemsId.length;
    parentCheckbox.current = isAllItemSelect && itemsId.length !== 0;

    setCheckedItemsId(itemsId.filter((id) => checkedItemsId.includes(id)));
  }, [itemsId]);

  return {
    parentCheckbox,
    checkedItemsId,
    updateEachItemCheckStatus,
    updateAllItemCheckState,
  };
};

export default useCheckedItems;
