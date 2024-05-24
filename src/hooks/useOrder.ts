import { useRecoilValue } from 'recoil';

import { orderItems } from '@/apis/order';
import { orderItemsIdSelector } from '@recoil/order/selector';

const useOrder = () => {
  const cartItemIds = useRecoilValue(orderItemsIdSelector);

  const order = async () => {
    await orderItems(cartItemIds);
  };

  return { order };
};

export default useOrder;
