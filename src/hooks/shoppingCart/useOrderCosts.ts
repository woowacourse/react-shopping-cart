import { totalDiscountPriceSelector } from '@recoil/orderConfirm';
import { orderPriceSelector, shippingPriceSelector, totalPriceSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useOrderCosts = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingPrice = useRecoilValue(shippingPriceSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

  const totalDiscountPrice = useRecoilValue(totalDiscountPriceSelector);

  return { orderPrice, shippingPrice, totalPrice, totalDiscountPrice };
};

export default useOrderCosts;
