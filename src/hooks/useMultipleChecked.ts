import { ChangeEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { checkedState } from '../states/checkedCartProducts';
import { cartProductState } from '../states/cartProducts';
import { deleteCartProduct } from '../apis/cartProducts';

const useMultipleChecked = () => {
  const [checked, setChecked] = useRecoilState(checkedState);
  const setCartProducts = useSetRecoilState(cartProductState);

  const isAllChecked = checked.every((item) => item.isChecked);
  const isAllUnchecked = checked.every((item) => !item.isChecked);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setChecked((prev) =>
      prev.map((item) => ({ ...item, isChecked: event.currentTarget.checked }))
    );
  };

  const deleteCheckedProducts = () => {
    setCartProducts((prev) =>
      prev.filter(
        (cartProduct) =>
          !checked.find((item) => item.id === cartProduct.id)?.isChecked
      )
    );
    setChecked((prev) => prev.filter((item) => !item.isChecked));

    checked.forEach((item) => {
      if (item.isChecked) deleteCartProduct(item.id);
    });
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};

export default useMultipleChecked;
