import { addCartItem } from '@api/index';
import { useToast } from './useToast';

const useAddCartItem = () => {
  const { showToast } = useToast();
  const handleAddProductButtonClick = async () => {
    try {
      await addCartItem(11);
      await addCartItem(12);
      await addCartItem(2);
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    }
  };

  return { handleAddProductButtonClick };
};

export default useAddCartItem;
