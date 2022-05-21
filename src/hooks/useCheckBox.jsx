import {useState} from 'react';
import useCart from 'hooks/useCart';

import {MESSAGE} from 'constants';

const useCheckBox = (compareList = []) => {
  const [checkedItemList, setCheckedItemList] = useState([]);
  const {deleteItem} = useCart();

  const changeCheckedList = (id) => {
    if (checkedItemList.find((checkedId) => checkedId === id)) {
      setCheckedItemList((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    setCheckedItemList((prev) => [...prev, id]);
  };

  const allChecked = () => {
    const cartedId = compareList.map(({id}) => id);

    if (checkedItemList.length === cartedId.length) {
      setCheckedItemList([]);
      return;
    }
    setCheckedItemList(cartedId);
  };

  const deleteSelectedItems = () => {
    if (checkedItemList.length === 0) {
      return alert(MESSAGE.NO_SELECTED_ITEM);
    }
    if (confirm(MESSAGE.DELETE_SELECTED_ITEMS)) {
      checkedItemList.forEach((id) => {
        deleteItem(id);
        changeCheckedList(id);
      });
    }
  };

  return {checkedItemList, changeCheckedList, allChecked, deleteSelectedItems};
};

export default useCheckBox;
