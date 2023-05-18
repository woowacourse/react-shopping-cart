import { useRecoilState } from 'recoil';

import selectedShoppingItemState from '@Atoms/selectedShoppingItemState';

const useSelectedShoppingItem = () => {
  const [itemId, setItemId] = useRecoilState<number[]>(selectedShoppingItemState);

  const isSelected = (id: number) => itemId.includes(id);

  const updateSelectedShoppingItem = (id: number) => {
    if (isSelected(id)) setItemId((prev) => prev.filter((_id) => _id !== id));
    else setItemId((prev) => [...prev, id]);
  };

  return { isSelected, updateSelectedShoppingItem };
};

export default useSelectedShoppingItem;
