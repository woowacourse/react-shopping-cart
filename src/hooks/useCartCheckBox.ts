import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { CheckedCartProducts, Product } from 'types/product';

const useCartCheckBox = () => {
  const cartProducts = useRecoilValue(cartProductsState);
  const [checkedProducts, setCheckedProducts] = useState<CheckedCartProducts>(new Set(cartProducts.keys()));

  useEffect(() => {
    setCheckedProducts(new Set(cartProducts.keys()));
  }, [cartProducts]);

  const isAllChecked = cartProducts.size === checkedProducts.size;
  const isChecked = (id: Product['id']) => checkedProducts.has(id);

  const check = (id: Product['id']) => {
    setCheckedProducts((prev) => new Set([...prev.add(id)]));
  };

  const unCheck = (id: Product['id']) => {
    setCheckedProducts((prev) => {
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

    setCheckedProducts(new Set(allChecked));
  };

  const unCheckAllBox = () => {
    setCheckedProducts(new Set([]));
  };

  const toggleCheckAllBox = () => {
    if (isAllChecked) unCheckAllBox();
    else checkAllBox();
  };

  return { checkedProducts, isAllChecked, isChecked, toggleCheck, toggleCheckAllBox };
};

export default useCartCheckBox;
