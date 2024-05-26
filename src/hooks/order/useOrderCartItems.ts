import { fetchOrders } from '@apis/orders';
import { selectedIdsAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import useRefreshStateAfterOrder from './useRefreshStateAfterOrder';

const useOrderCartItems = () => {
  const selectedIds = useRecoilValue(selectedIdsAtom);
  const { refreshStateAfterOrder } = useRefreshStateAfterOrder();

  const [fetchError, setFetchError] = useState<Error | null>(null);

  const orderCartItems = async () => {
    try {
      await fetchOrders(selectedIds);
      await refreshStateAfterOrder();
    } catch (error) {
      if (error instanceof Error) return setFetchError(error);
      setFetchError(new Error('상품 주문 fetch 오류'));
    }
  };

  return {
    fetchError,
    orderCartItems,
  };
};

export default useOrderCartItems;
