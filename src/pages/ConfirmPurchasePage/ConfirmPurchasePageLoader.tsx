import { ReactNode, useEffect } from 'react';
import { useCartItemList } from '../../recoil/cartItemList/hooks';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { cartItemListQuery } from '../../recoil/cartItemList/states';
import { selectedCartItemIdListAtom } from '../../recoil/selectedCartItemIdList/states';

const ConfirmPurchasePageLoader = ({ children }: { children: ReactNode }) => {
  const { updateCartItemList } = useCartItemList();
  const cartItemListLoadable = useRecoilValueLoadable(cartItemListQuery);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListAtom);

  useEffect(() => {
    updateCartItemList();
  }, []);

  if (selectedCartItemIdList.length === 0) return <div>잘못된 접근입니다.</div>;

  if (cartItemListLoadable.state === 'hasValue') {
    return children;
  }
};

export default ConfirmPurchasePageLoader;
