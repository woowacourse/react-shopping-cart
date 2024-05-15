import { OrderPriceSelector } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/index';
import { useRecoilValue } from 'recoil';

import * as Styled from './OrderPrice.styled';
const OrderPrice = () => {
  const { totalPrice, shippingPrice, orderPrice } = useRecoilValue(OrderPriceSelector);
  return (
    <Styled.OrderPrice>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <span>주문 금액</span>
          <span>{formatKoreanCurrency(orderPrice)}</span>
        </Styled.PriceRow>
        <Styled.PriceRow>
          <span>배송비</span>
          <span>{formatKoreanCurrency(shippingPrice)}</span>
        </Styled.PriceRow>
      </Styled.PriceGroup>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <span>총 결제 금액</span>
          <span>{formatKoreanCurrency(totalPrice)}</span>
        </Styled.PriceRow>
      </Styled.PriceGroup>
    </Styled.OrderPrice>
  );
};

export default OrderPrice;
