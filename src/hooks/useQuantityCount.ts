import { useRecoilState, useRecoilValue } from 'recoil';
import { productQuantityState, productsState } from '../store/productStore';
import { CartItemType } from '../types';
import { updateCartItemQuantity } from '../api/index';
import { NOTICE_MESSAGE } from '../constants/messages';

const useQuantityCount = ({ id }: { id: number }) => {
  const [products, setProducts] = useRecoilState(productsState);
  const productQuantity = useRecoilValue(productQuantityState(id));

  const updateProductQuantity = async (newQuantity: number) => {
    try {
      await updateCartItemQuantity(id, newQuantity);

      const newProducts = products.map((product: CartItemType) =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      );
      setProducts(newProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrementButton = async () => {
    const newQuantity = productQuantity + 1;
    await updateProductQuantity(newQuantity);
  };

  const handleDecrementButton = async () => {
    const newQuantity = productQuantity - 1;
    if (newQuantity < 1) {
      alert(NOTICE_MESSAGE.min_quantity);
      return;
    }
    await updateProductQuantity(newQuantity);
  };

  return {
    handleIncrementButton,
    handleDecrementButton,
  };
};

export default useQuantityCount;
