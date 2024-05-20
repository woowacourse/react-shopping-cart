import { useRecoilState } from 'recoil';
import { individualCartItemQuantity } from '../store/selectors';
import { updateCartItemQuantity } from '../api/index';

const useQuantityCount = (id: number) => {
  const [productQuantity, setProductQuantity] = useRecoilState(individualCartItemQuantity(id));

  const handleIncrementQuantity = async () => {
    const { success } = await updateCartItemQuantity(id, productQuantity + 1);
    success && setProductQuantity(productQuantity + 1);
  };

  const handleDecrementQuantity = async () => {
    const newQuantity = Math.max(productQuantity - 1, 1);

    if (newQuantity < productQuantity) {
      const { success } = await updateCartItemQuantity(id, newQuantity);

      if (success) {
        setProductQuantity(newQuantity);
      }
    }
  };

  return {
    productQuantity,
    handleIncrementQuantity,
    handleDecrementQuantity,
  };
};

export default useQuantityCount;
