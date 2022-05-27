import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useExcludeCart = id => {
  const { cartList } = useSelector((state: any) => state.cart);

  const isShowCartButton = useMemo(() => !cartList.find(cart => cart.id === id), [cartList, id]);

  return isShowCartButton;
};
