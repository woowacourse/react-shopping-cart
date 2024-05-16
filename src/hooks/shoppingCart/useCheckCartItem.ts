import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useRecoilState, useRecoilValue } from 'recoil';

const useCheckCartItem = () => {
  const cartItems = useRecoilValue(cartItemsSelector);

  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedIdsAtom);

  const isChecked = (id: number) => selectedCartItemIds.some((selectedId) => selectedId === id);

  const isAllChecked = selectedCartItemIds.length === cartItems.length;

  const onCheckAllCartItems = (checked: boolean) => {
    const newCheckState = checked ? cartItems.map((cartItem) => cartItem.id) : [];

    setSelectedCartItemIds(newCheckState);
  };

  const onCheckCartItem = (checked: boolean, id: number) => {
    const newSelectedCartItemIds = checked
      ? [...selectedCartItemIds, id]
      : selectedCartItemIds.filter((selectedId) => selectedId !== id);

    setSelectedCartItemIds(newSelectedCartItemIds);
  };

  return { isChecked, isAllChecked, onCheckCartItem, onCheckAllCartItems };
};

export default useCheckCartItem;
