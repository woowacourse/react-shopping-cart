import { updateCartItemQuantity } from '../api/index';
import { useCartManager } from '@/store/custom/useCartManager';

const useQuantityCount = (id: number) => {
  const { individualCartItemQuantity } = useCartManager();
  const [productQuantity, setProductQuantity] = individualCartItemQuantity(id);

  const handleIncrementQuantity = async () => {
    try {
      await updateCartItemQuantity(id, productQuantity + 1);
      setProductQuantity((prevQuantity: number) => prevQuantity + 1);
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
        setProductQuantity((prevQuantity: number) => Math.max(prevQuantity - 1, 1));
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
