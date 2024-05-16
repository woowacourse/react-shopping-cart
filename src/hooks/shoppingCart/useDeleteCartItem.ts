import { fetchDeleteCartItem } from '@apis/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useDeleteCartItem = (id: number) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);
  const setSelectedCartItemIds = useSetRecoilState(selectedIdsAtom);

  const onDeleteItem = async () => {
    await fetchDeleteCartItem(id);

    setCartItems((prevCartItems) => prevCartItems.filter((prevCartItem) => prevCartItem.id !== id));
    setSelectedCartItemIds((prevSelectedIds) => prevSelectedIds.filter((prevSelectedId) => prevSelectedId !== id));
  };

  return { onDeleteItem };
};

export default useDeleteCartItem;
