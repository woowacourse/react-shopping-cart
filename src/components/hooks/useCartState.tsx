import { useSetRecoilState } from 'recoil';
import { cartState } from '../../atoms/CartState';
import { ProductItem } from '../../types/productType';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const setCartStates = useSetRecoilState(cartState);

  const handleAddCartState = () => {
    setCartStates((prevCartStates) => [
      ...prevCartStates,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const handleDeleteCartState = () => {
    setCartStates((prevCartStates) =>
      prevCartStates.filter((product) => product.id !== id)
    );
  };

  return { handleAddCartState, handleDeleteCartState };
};
