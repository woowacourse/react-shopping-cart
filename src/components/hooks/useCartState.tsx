import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms/CartState';
import { CartProductList, ProductItem } from '../../types/productType';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const [addedCartStates, setAddedCartStates] = useRecoilState(cartState);

  const handleAddCartState = () => {
    setAddedCartStates([
      ...addedCartStates,
      {
        id,
        quantity: 1,
        product: props,
      },
    ]);
  };

  const handleDeleteCartState = () => {
    const deleteItemId = addedCartStates.filter(
      (item: CartProductList) => item.id !== id
    );
    setAddedCartStates(deleteItemId);
  };

  return { handleAddCartState, handleDeleteCartState };
};
