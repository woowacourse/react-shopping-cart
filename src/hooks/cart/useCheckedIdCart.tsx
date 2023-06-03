import { useRecoilState } from 'recoil';
import { checkedItemIdList } from '../../recoil/cart';
import { CartItem } from '../../types/cart';

const useCheckedIdCart = () => {
  const [checkedItemIds, setCheckedItemIds] = useRecoilState(checkedItemIdList);

  const isChecked = (id: number) => {
    return checkedItemIds.includes(id);
  };

  const toggleItemCheckedState = (id: number) => {
    if (isChecked(id)) {
      setCheckedItemIds((list) => list.filter((itemId) => itemId !== id));
      return;
    }

    setCheckedItemIds((list) => [...list, id]);
  };

  const deleteInCheckedCart = (id: number) => {
    setCheckedItemIds((list) => list.filter((itemId) => itemId !== id));
  };

  const toggleAllCheckedState = (cart: CartItem[]) => {
    if (checkedItemIds.length === cart.length) {
      emptyCheckedItemIds();
      return;
    }

    checkAllItemIds(cart);
  };

  const checkAllItemIds = (cart: CartItem[]) => {
    setCheckedItemIds(cart.map((item) => item.id));
  };

  const emptyCheckedItemIds = () => {
    setCheckedItemIds([]);
  };

  return {
    checkedItemIds,
    isChecked,
    toggleItemCheckedState,
    toggleAllCheckedState,
    deleteInCheckedCart,
    checkAllItemIds,
    emptyCheckedItemIds,
  };
};

export default useCheckedIdCart;
