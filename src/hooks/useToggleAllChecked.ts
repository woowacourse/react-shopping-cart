import { useRecoilValue, useRecoilCallback } from 'recoil';
import { useState } from 'react';
import { productsIds } from '../store/selectors';
import { isCheckedState } from '../store/atoms';
import areAllItemsChecked from '../utils/areAllItemsChecked';
import { CartItemType } from '../types';

const useToggleAllChecked = ({ products }: { products: CartItemType[] }) => {
  const productIds = useRecoilValue(productsIds);
  const [allChecked, setAllChecked] = useState(areAllItemsChecked(productIds));

  const handleToggleAll = useRecoilCallback(
    ({ set }) =>
      () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);

        products.forEach((product) => {
          set(isCheckedState(product.id), newAllChecked);
          window.localStorage.setItem(JSON.stringify(product.id), JSON.stringify(newAllChecked));
        });
      },
    [allChecked, products],
  );

  return {
    handleToggleAll,
    allChecked,
    setAllChecked,
  };
};

export default useToggleAllChecked;
