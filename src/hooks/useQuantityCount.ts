import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState } from '../store/atoms';
import { productQuantityState } from '../store/selectors';
import { updateCartItemQuantity } from '../api/index';
import { CartItemType } from '../types';
import { NOTICE_MESSAGE } from '../constants/messages';

const useQuantityCount = ({ id }: { id: number }) => {
  const [products, setProducts] = useRecoilState(productsState);
  const productQuantity = useRecoilValue(productQuantityState(id));

  const updateProductQuantity = async (newQuantity: number) => {
    const { success } = await updateCartItemQuantity(id, newQuantity);
    if (success) {
      const newProducts = products.map((product: CartItemType) =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      );
      setProducts(newProducts);
    }
  };

  const handleIncrementButton = async () => {
    await updateProductQuantity(productQuantity + 1);
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
