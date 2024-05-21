import { useRecoilValueLoadable } from 'recoil';
import { cartItemListStateQuery } from '../../recoil/cartItemList/cartItemListState';
import { ReactNode, useEffect } from 'react';
import LoadingFallback from '../../components/LoadingFallback/LoadingFallback';
import { useCartItemList } from '../../recoil/cartItemList/useCartItemList';

const CartItemListLoader = ({ children }: { children: ReactNode }) => {
  const { updateCartItemList } = useCartItemList();
  const cartItemListLoadable = useRecoilValueLoadable(cartItemListStateQuery);

  useEffect(() => {
    updateCartItemList();
  }, []);

  switch (cartItemListLoadable.state) {
    case 'hasValue':
      return children;
    case 'hasError':
      return <div>장바구니 목록을 불러올 수 없습니다.</div>;
    case 'loading':
      return <LoadingFallback />;
  }
};

export default CartItemListLoader;
