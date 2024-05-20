import { fetchDeleteCartItem } from '@apis/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useDeleteCartItem = (id: number) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);
  const setSelectedCartItemIds = useSetRecoilState(selectedIdsAtom);

  const updateCartItems = () => {
    setCartItems((prevCartItems) => prevCartItems.filter((prevCartItem) => prevCartItem.id !== id));
  };

  const updateSelectedCartItemIds = () => {
    setSelectedCartItemIds((prevSelectedIds) => {
      prevSelectedIds.delete(id);

      return prevSelectedIds;
    });
  };

  const onDeleteItem = async () => {
    await fetchDeleteCartItem(id);

    updateCartItems();
    updateSelectedCartItemIds();
  };

  return { updateCartItems, updateSelectedCartItemIds, onDeleteItem };
};

export default useDeleteCartItem;
