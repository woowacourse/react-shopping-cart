import { useSetRecoilState } from 'recoil';
import { cartState } from '../../atoms/CartState';
import { ProductItem } from '../../types/productType';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const setAddedCartStates = useSetRecoilState(cartState);

  const handleAddCartState = () => {
    setAddedCartStates((prev) => [
      ...prev,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const handleDeleteCartState = () => {
    setAddedCartStates((prev) => prev.filter((product) => product.id !== id));
  };

  return { handleAddCartState, handleDeleteCartState };
};
