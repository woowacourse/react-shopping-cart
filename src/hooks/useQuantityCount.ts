import { useRecoilState, useRecoilValue } from 'recoil';
import { productQuantityState, productsState } from '@store/productStore';
import { CartItemType } from '../types';
import { updateCartItemQuantity } from '@api/index';
import { NOTICE_MESSAGE } from '@constants/messages';
import { useToast } from '@hooks/useToast';

const useQuantityCount = ({ id }: { id: number }) => {
  const [products, setProducts] = useRecoilState(productsState);
  const productQuantity = useRecoilValue(productQuantityState(id));
  const { showToast } = useToast();

  const updateProductQuantity = async (newQuantity: number) => {
    try {
      await updateCartItemQuantity(id, newQuantity);

      const newProducts = products.map((product: CartItemType) =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      );
      setProducts(newProducts);
    } catch (error) {
      showToast('상품 수량 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
      showToast(NOTICE_MESSAGE.min_quantity);
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
