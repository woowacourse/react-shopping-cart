import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemsState, checkedCartItemIdsState } from '../recoil/atoms';

export default function useCheckCartItem() {
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(checkedCartItemIdsState);
  const cartItems = useRecoilValue(cartItemsState);

  const isChecked = (id: number) => checkedCartItemIds.includes(id);

  const isAllChecked =
    cartItems.length === checkedCartItemIds.length &&
    cartItems.map((item) => item.id).every((id) => checkedCartItemIds.includes(id));

  const onCheckCartItem = (id: number, isChecked: boolean) => {
    const newCheckedCartItemIds = isChecked
      ? [...checkedCartItemIds, id]
      : [...checkedCartItemIds].filter((itemId) => itemId !== id);
    setCheckedCartItemIds(newCheckedCartItemIds);
  };

  const onCheckAllCartItem = (isChecked: boolean) => {
    const newCheckedCartItemIds = isChecked ? cartItems.map((item) => item.id) : [];
    setCheckedCartItemIds(newCheckedCartItemIds);
  };

  return { isChecked, isAllChecked, onCheckCartItem, onCheckAllCartItem };
}
