import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useRecoilState, useRecoilValue } from 'recoil';

const useCheckCartItem = () => {
  const cartItems = useRecoilValue(cartItemsSelector);

  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedIdsAtom);

  const isChecked = (id: number) => selectedCartItemIds.has(id);

  const isAllChecked = selectedCartItemIds.size === cartItems.length;

  const onCheckAllCartItems = () => {
    const newCheckState = !isAllChecked ? new Set(cartItems.map((item) => item.id)) : new Set();

    setSelectedCartItemIds(newCheckState);
  };

  const onCheckCartItem = (id: number) => {
    const newSelectedCartItemIds = new Set(selectedCartItemIds);

    if (!isChecked(id)) {
      newSelectedCartItemIds.add(id);
    } else {
      newSelectedCartItemIds.delete(id);
    }

    setSelectedCartItemIds(newSelectedCartItemIds);
  };

  return { isChecked, isAllChecked, onCheckCartItem, onCheckAllCartItems };
};

export default useCheckCartItem;
