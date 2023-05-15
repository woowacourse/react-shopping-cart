import { useRecoilState } from 'recoil';
import { CartProductList, ProductItem } from '../../types/productType';
import { cartState } from '../../atoms/CartState';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const [cartProductList, setCartProductList] = useRecoilState(cartState);

  const addToCartState = () => {
    setCartProductList([
      ...cartProductList,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const deleteCartState = () => {
    const deleteItemId = cartProductList.filter(
      (item: CartProductList) => item.id !== id
    );
    setCartProductList(deleteItemId);
  };

  return { addToCartState, deleteCartState };
};
