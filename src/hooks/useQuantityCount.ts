import { useRecoilState } from 'recoil';
import { individualCartItemQuantitySelector } from '../store/selectors';
import { updateCartItemQuantity } from '../api/index';

const useQuantityCount = (id: number) => {
  const [productQuantity, setProductQuantity] = useRecoilState(
    individualCartItemQuantitySelector(id),
  );

  const handleIncrementQuantity = async () => {
    try {
      await updateCartItemQuantity(id, productQuantity + 1);
      setProductQuantity(productQuantity + 1);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleDecrementQuantity = async () => {
    try {
      const newQuantity = Math.max(productQuantity - 1, 1);

      if (newQuantity < productQuantity) {
        await updateCartItemQuantity(id, newQuantity);
        setProductQuantity(newQuantity);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
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
