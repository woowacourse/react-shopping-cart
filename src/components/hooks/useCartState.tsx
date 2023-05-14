import { useRecoilState } from 'recoil';
import { CartProductList, ProductItem } from '../../types/productType';
import { cartState } from '../../atoms/CartState';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const [cartProductList, setCartProductList] = useRecoilState(cartState);

  const handleAddCartState = () => {
    setCartProductList([
      ...cartProductList,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const handleDeleteCartState = () => {
    const deleteItemId = cartProductList.filter(
      (item: CartProductList) => item.id !== id
    );
    setCartProductList(deleteItemId);
  };

  return { handleAddCartState, handleDeleteCartState };
};
