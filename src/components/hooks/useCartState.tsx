import { useRecoilState } from 'recoil';
import { addedCartState } from '../../atoms/AddedCartState';
import { AddedProductList, ProductItem } from '../../types/productType';

export const useCartState = (props: ProductItem) => {
  const { id } = props;
  const [addedCartStates, setAddedCartStates] = useRecoilState(addedCartState);

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
      (item: AddedProductList) => item.id !== id
    );
    setAddedCartStates(deleteItemId);
  };

  return { handleAddCartState, handleDeleteCartState };
};
