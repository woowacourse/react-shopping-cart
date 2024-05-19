import { useRecoilState, useRecoilValue } from 'recoil';
import { productsState } from '../store/atoms';
import { productQuantityState } from '../store/selectors';
import { updateCartItemQuantity } from '../api/index';
import { CartItemType } from '../types';
import { NOTICE_MESSAGE } from '../constants/messages';

const useQuantityCount = ({ id }: { id: number }) => {
  const [products, setProducts] = useRecoilState(productsState);
  const productQuantity = useRecoilValue(productQuantityState(id));

  const handleIncrementButton = async () => {
    const newQuantity = productQuantity + 1;
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) {
      const newProducts = products.map((product: CartItemType) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });

      setProducts(newProducts);
    }
  };

  const handleDecrementButton = async () => {
    const newQuantity = productQuantity - 1;
    if (newQuantity < 1) {
      alert(NOTICE_MESSAGE.min_quantity);
      return;
    }
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) {
      const newProducts = products.map((product: CartItemType) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });

      setProducts(newProducts);
    }
  };

  return {
    handleIncrementButton,
    handleDecrementButton,
  };
};

export default useQuantityCount;
