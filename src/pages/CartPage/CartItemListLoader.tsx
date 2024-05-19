import { useRecoilValueLoadable } from 'recoil';
import { cartItemListQuery } from '../../recoil/cartItemList/states';
import { ReactNode } from 'react';
import LoadingFallback from '../../components/LoadingFallback/LoadingFallback';

const CartItemListLoader = ({ children }: { children: ReactNode }) => {
  const cartItemListLoadable = useRecoilValueLoadable(cartItemListQuery);

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
