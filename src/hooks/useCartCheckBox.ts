import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { Product } from 'types/product';

const useCartCheckBox = () => {
  const cartProducts = useRecoilValue(cartProductsState);
  const cartProductsCount = cartProducts.size;
  const [checkedBoxes, setCheckedBoxes] = useState(new Set<Product['id']>(cartProducts.keys()));
  const isAllChecked = checkedBoxes.size === cartProductsCount;
  const isChecked = (id: Product['id']) => checkedBoxes.has(id);

  const check = (id: Product['id']) => {
    setCheckedBoxes((prev) => new Set([...prev.add(id)]));
  };

  const unCheck = (id: Product['id']) => {
    setCheckedBoxes((prev) => {
      prev.delete(id);

      return new Set([...prev]);
    });
  };

  const toggleCheck = (id: Product['id']) => {
    if (isChecked(id)) unCheck(id);
    else check(id);
  };

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

  return { isAllChecked, isChecked, toggleCheck, toggleCheckAllBox };
};

export default useCartCheckBox;
