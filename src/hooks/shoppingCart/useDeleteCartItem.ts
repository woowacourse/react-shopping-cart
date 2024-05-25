import ShoppingCartFetcher from '@apis/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useDeleteCartItem = (id: number) => {
  console.log(id);
  const setCartItems = useSetRecoilState(cartItemsAtom);
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
    await ShoppingCartFetcher.deleteCartItem(id);

    updateCartItems();
    updateSelectedCartItemIds();
  };

  return { updateCartItems, updateSelectedCartItemIds, onDeleteItem };
};

export default useDeleteCartItem;
