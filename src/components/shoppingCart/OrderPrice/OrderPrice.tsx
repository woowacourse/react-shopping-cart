import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/index';
import { useRecoilValue } from 'recoil';

import * as Styled from './OrderPrice.styled';
const OrderPrice = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <Styled.OrderPrice>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <Styled.PriceLabel>주문 금액</Styled.PriceLabel>
          <Styled.PriceAmount>{formatKoreanCurrency(orderPrice)}</Styled.PriceAmount>
        </Styled.PriceRow>
        <Styled.PriceRow>
          <Styled.PriceLabel>배송비</Styled.PriceLabel>
          <Styled.PriceAmount>{formatKoreanCurrency(shippingFee)}</Styled.PriceAmount>
        </Styled.PriceRow>
      </Styled.PriceGroup>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <Styled.PriceLabel>총 결제 금액</Styled.PriceLabel>
          <Styled.PriceAmount>{formatKoreanCurrency(totalPrice)}</Styled.PriceAmount>
        </Styled.PriceRow>
      </Styled.PriceGroup>
    </Styled.OrderPrice>
  );
};

export default OrderPrice;
