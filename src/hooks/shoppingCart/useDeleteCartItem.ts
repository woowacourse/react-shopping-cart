import { fetchDeleteCartItem } from '@apis/shoppingCart';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useDeleteCartItem = (id: number) => {
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const setSelectedCartItemIds = useSetRecoilState(selectedIdsAtom);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const updateCartItems = () => {
    setCartItems((prevCartItems) => prevCartItems.filter((prevCartItem) => prevCartItem.id !== id));
  };

  const updateSelectedCartItemIds = () => {
    setSelectedCartItemIds((prevSelectedIds) => prevSelectedIds.filter((prevSelectedId) => prevSelectedId !== id));
  };

  const onDeleteItem = async () => {
    try {
      await fetchDeleteCartItem(id);
      updateCartItems();
      updateSelectedCartItemIds();
    } catch (error) {
      if (error instanceof Error) return setFetchError(error);
      setFetchError(new Error('상품 삭제 fetch 오류'));
    }
  };

  return { fetchError, updateCartItems, updateSelectedCartItemIds, onDeleteItem };
};

export default useDeleteCartItem;
