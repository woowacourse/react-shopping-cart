import { deleteCartItem } from '../api/index';
import { useRecoilState } from 'recoil';
import { allCartItemStates } from '../store/atoms';

const useDeleteProduct = (id: number) => {
  const [, setProducts] = useRecoilState(allCartItemStates);

  const handleDeleteButton = async () => {
    try {
      await deleteCartItem(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
