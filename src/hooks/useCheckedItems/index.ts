import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import shoppingCartItemsIdState from '@Selector/shoppingCartItemsIdState';

const useCheckedItems = () => {
  const itemsId = useRecoilValue(shoppingCartItemsIdState);
  const [checkedItemsId, setCheckedItemsId] = useState<number[]>(itemsId);
  const isAllItemSelect = new Set([...itemsId, ...checkedItemsId]).size === checkedItemsId.length;

  const updateEachItemCheckStatus = (id: number) => {
    return () => {
      if (checkedItemsId.includes(id)) {
        setCheckedItemsId(checkedItemsId.filter((itemID) => itemID !== id));
      } else {
        setCheckedItemsId([...checkedItemsId, id]);
      }
    };
  };

  const updateAllItemCheckState = () => {
    if (!isAllItemSelect) {
      setCheckedItemsId(itemsId);
    } else {
      setCheckedItemsId([]);
    }
  };

  useEffect(() => {
    setCheckedItemsId(checkedItemsId.filter((itemID) => itemsId.includes(itemID)));
  }, [itemsId]);

  return {
    isAllItemSelect,
    checkedItemsId,
    updateEachItemCheckStatus,
    updateAllItemCheckState,
  };
};

export default useCheckedItems;
