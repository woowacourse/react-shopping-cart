// import { totalDiscountPriceAtom } from '@recoil/orderConfirm/atoms';
import { orderPriceSelector, shippingPriceSelector, totalPriceSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useOrderCosts = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingPrice = useRecoilValue(shippingPriceSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);
  // const totalDiscountPrice = useRecoilValue(totalDiscountPriceAtom);

  // console.log(totalDiscountPrice);

  return { orderPrice, shippingPrice, totalPrice };
};

export default useOrderCosts;
