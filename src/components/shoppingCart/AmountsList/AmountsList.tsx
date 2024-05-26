import { OrderPriceInfo } from '@components/common';
import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const AmountsList = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <OrderPriceInfo>
      <OrderPriceInfo.Row title="주문 금액" price={orderPrice} />
      <OrderPriceInfo.Row title="배송비" price={shippingFee} />
      <OrderPriceInfo.Row title="총 결제 금액" price={totalPrice} />
    </OrderPriceInfo>
  );
};

export default AmountsList;
