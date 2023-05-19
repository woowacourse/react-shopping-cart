import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import shoppingCartItemsIdState from '@Selector/shoppingCartItemsIdState';

const useCheckedItems = () => {
  const itemsId = useRecoilValue(shoppingCartItemsIdState);
  const [checkedItemsId, setCheckedItemsId] = useState<number[]>([]);
  const parentCheckbox = useRef(false);

  const getCheckedItemAmount = () => {
    return checkedItemsId.length;
  };

  const isCheckedItem = (id: number) => {
    return checkedItemsId.includes(id);
  };

  const updateCheckStatus = (id: number) => {
    return () => {
      if (isCheckedItem(id)) {
        parentCheckbox.current = false;
        setCheckedItemsId(checkedItemsId.filter((itemID) => itemID !== id));
      } else {
        if (itemsId.length === checkedItemsId.length + 1) parentCheckbox.current = true;
        setCheckedItemsId([...checkedItemsId, id]);
      }
    };
  };

  const changeAllItemToCheckedItem = () => {
    setCheckedItemsId(itemsId);
  };

  const changeAllItemToUncheckedItem = () => {
    setCheckedItemsId([]);
  };

  useEffect(() => {
    setCheckedItemsId(itemsId.filter((id) => checkedItemsId.includes(id)));
  }, [itemsId]);

  return {
    parentCheckbox,
    checkedItemsId,
    getCheckedItemAmount,
    isCheckedItem,
    updateCheckStatus,
    changeAllItemToCheckedItem,
    changeAllItemToUncheckedItem,
  };
};

export default useCheckedItems;
