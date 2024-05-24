import { useRecoilValueLoadable } from 'recoil';
import { cartItemListStateQuery } from '../../recoil/cartItemList/cartItemListState';
import { ReactNode, useEffect } from 'react';
import LoadingFallback from '../../components/LoadingFallback/LoadingFallback';
import { useCartItemList } from '../../recoil/cartItemList/useCartItemList';

const CartPageLoader = ({ children }: { children: ReactNode }) => {
  const cartItemListLoadable = useRecoilValueLoadable(cartItemListStateQuery);
  const { updateCartItemList } = useCartItemList();

  useEffect(() => {
    updateCartItemList();
  }, []);

  switch (cartItemListLoadable.state) {
    case 'hasValue':
      return children;
    case 'hasError':
      throw cartItemListLoadable.contents;
    case 'loading':
      return <LoadingFallback />;
  }
};

export default CartPageLoader;
