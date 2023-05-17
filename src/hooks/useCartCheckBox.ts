import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { Product } from 'types/product';

const useCartCheckBox = () => {
  const cartProducts = useRecoilValue(cartProductsState);
  const cartProductsCount = cartProducts.size;
  const [checkedBoxes, setCheckedBoxes] = useState(new Set<Product['id']>([]));
  const isAllChecked = checkedBoxes.size === cartProductsCount;

  const checkAllBox = () => {
    const allChecked = [...cartProducts.keys()];

    setCheckedBoxes(new Set(allChecked));
  };

  const unCheckAllBox = () => {
    setCheckedBoxes(new Set([]));
  };

  const toggleCheckAllBox = () => {
    if (isAllChecked) unCheckAllBox();
    else checkAllBox();
  };

  return { checkedBoxes, isAllChecked, toggleCheckAllBox };
};

export default useCartCheckBox;
