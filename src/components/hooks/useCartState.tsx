import { useSetRecoilState } from 'recoil';
import { ProductItem } from '../../types/productType';
import { cartState } from '../../atoms/CartState';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const setCartProductState = useSetRecoilState(cartState);

  const addToCartState = () => {
    setCartProductState((prev) => [
      ...prev,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  return { addToCartState };
};
