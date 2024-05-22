import { ReactNode, useEffect } from 'react';
import { useCartItemList } from '../../recoil/cartItemList/useCartItemList';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { cartItemListStateQuery } from '../../recoil/cartItemList/cartItemListState';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';

const ConfirmPurchasePageLoader = ({ children }: { children: ReactNode }) => {
  const { updateCartItemList } = useCartItemList();
  const cartItemListLoadable = useRecoilValueLoadable(cartItemListStateQuery);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);

  useEffect(() => {
    updateCartItemList();
  }, []);

  if (selectedCartItemIdList.length === 0) return <div>잘못된 접근입니다.</div>;

  if (cartItemListLoadable.state === 'hasValue') {
    return children;
  }
};

export default ConfirmPurchasePageLoader;
