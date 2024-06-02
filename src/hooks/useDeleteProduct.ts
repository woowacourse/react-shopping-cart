import { useSetRecoilState } from 'recoil';
import { fetchCartItemState } from '@store/productStore';
import { deleteCartItem } from '@api/index';

const useDeleteProduct = ({ id }: { id: number }) => {
  const setProducts = useSetRecoilState(fetchCartItemState);

  const handleDeleteButton = async () => {
    try {
      await deleteCartItem(id);

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      localStorage.removeItem(JSON.stringify(id));
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDeleteButton };
};

export default useDeleteProduct;
