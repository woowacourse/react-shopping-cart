import { useRecoilValue } from 'recoil';

import {
  orderResultState,
  shippingPriceState,
  totalPurchasePriceState,
} from '@/recoil/cartItems/selectors';
import { totalDiscountPriceState } from '@/recoil/coupons/selectors';
import { calculateShippingPrice } from '@/utils/cartItems/utils';

const useOrderInfo = (type: 'CART' | 'ORDER') => {
  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const shippingPriceWithCoupon = useRecoilValue(shippingPriceState);

  const shippingPrice = calculateShippingPrice(totalOrderPrice);
  const displayTotalDiscountPrice = totalDiscountPrice > 0 ? totalDiscountPrice * -1 : 0;

  return {
    totalOrderPrice,
    shippingPrice: type === 'CART' ? shippingPrice : shippingPriceWithCoupon,
    totalDiscountPrice: displayTotalDiscountPrice,
    totalPurchasePrice: type === 'CART' ? totalOrderPrice + shippingPrice : totalPurchasePrice,
  };
};

export default useOrderInfo;
