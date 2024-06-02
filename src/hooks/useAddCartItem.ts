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
        showToast('장바구니가 비었는지 확인 후 다시 시도해주세요.');
      }
    }
  };

  return { handleAddProductButtonClick };
};

export default useAddCartItem;
