import { useRecoilValue } from 'recoil';

import { calculateShippingPrice } from '@/components/Cart/utils';
import {
  orderResultState,
  shippingPriceState,
  totalPurchasePriceState,
} from '@/recoil/cartItems/selectors';
import { totalDiscountPriceState } from '@/recoil/coupons/atoms';

const useOrderInfo = (type: 'CART' | 'ORDER') => {
  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const shippingPriceWithCoupon = useRecoilValue(shippingPriceState);

  const shippingPrice = calculateShippingPrice(totalOrderPrice);
  const displayTotalDiscountPrice = totalDiscountPrice > 0 ? totalDiscountPrice * -1 : 0;

  if (type === 'CART') {
    return {
      totalOrderPrice,
      shippingPrice,
      totalDiscountPrice: displayTotalDiscountPrice,
      totalPurchasePrice: totalOrderPrice + shippingPrice,
    };
  }

  return {
    totalOrderPrice,
    shippingPrice: shippingPriceWithCoupon,
    totalDiscountPrice: displayTotalDiscountPrice,
    totalPurchasePrice,
  };
};

export default useOrderInfo;
