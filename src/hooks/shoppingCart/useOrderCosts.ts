import { totalDiscountPriceSelector } from '@recoil/orderConfirm/selectors';
import {
  afterDiscountTotalPriceSelector,
  beforeDiscountTotalPriceSelector,
  orderPriceSelector,
  shippingPriceSelector,
} from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useOrderCosts = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingPrice = useRecoilValue(shippingPriceSelector);
  const beforeDiscountTotalPrice = useRecoilValue(beforeDiscountTotalPriceSelector);
  const afterDiscountTotalPrice = useRecoilValue(afterDiscountTotalPriceSelector);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);

  return { orderPrice, shippingPrice, beforeDiscountTotalPrice, afterDiscountTotalPrice, totalDiscountPrice };
};

export default useOrderCosts;
