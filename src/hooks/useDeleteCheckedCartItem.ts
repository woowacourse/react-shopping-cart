import { useCartItemsContext } from '../contexts/CartItemsContext';
import { useCheckedCartItemsContext } from '../contexts/CheckedCartItemContext';

const useDeleteCheckedCartItem = () => {
  const { deleteCartItem } = useCartItemsContext();
  const { removeCheckedCartItem } = useCheckedCartItemsContext();

  const handleClickDelete = (id: number) => {
    deleteCartItem(id);
    removeCheckedCartItem(id);
  };

  return { handleClickDelete };
};

export default useDeleteCheckedCartItem;
