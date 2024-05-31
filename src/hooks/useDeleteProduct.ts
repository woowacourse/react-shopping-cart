import { deleteCartItem } from '../api/index';
import { useCartManager } from '@/store/custom/useCartManager';
import { CartItemData } from '@/types';

const useDeleteProduct = (id: number) => {
  const { allCartItemStates } = useCartManager();
  const [, setProducts] = allCartItemStates;

  const handleDeleteButton = async () => {
    try {
      await deleteCartItem(id);
      setProducts((prevProducts: CartItemData[]) =>
        prevProducts.filter((product) => product.id !== id),
      );
      localStorage.removeItem(JSON.stringify(id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return { handleDeleteButton };
};

export default useDeleteProduct;
