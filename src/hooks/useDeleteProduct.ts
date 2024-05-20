import { deleteCartItem } from '../api/index';
import { useRecoilState } from 'recoil';
import { allCartItemStates } from '../store/atoms';

const useDeleteProduct = (id: number) => {
  const [, setProducts] = useRecoilState(allCartItemStates);

  const handleDeleteButton = async () => {
    const { success } = await deleteCartItem(id);

    if (success) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      localStorage.removeItem(JSON.stringify(id));
    }
  };

  return { handleDeleteButton };
};

export default useDeleteProduct;
