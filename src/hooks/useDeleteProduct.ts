import { useRecoilState } from 'recoil';
import { productsState } from '../store/productStore';
import { deleteCartItem } from '../api/index';

const useDeleteProduct = ({ id }: { id: number }) => {
  const [, setProducts] = useRecoilState(productsState);

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
