import { formatKoreanCurrency } from '@utils/index';

import * as Styled from './OrderPrice.styled';

interface OrderPriceProps {
  orderPrice: number;
  shippingPrice: number;
  discountPrice?: number;
  totalPrice: number;
}

const OrderPrice: React.FC<OrderPriceProps> = ({ orderPrice, shippingPrice, discountPrice, totalPrice }) => {
  return (
    <Styled.OrderPrice>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <span>주문 금액</span>
          <span>{formatKoreanCurrency(orderPrice)}</span>
        </Styled.PriceRow>
        {discountPrice !== undefined && (
          <Styled.PriceRow>
            <span>쿠폰 할인 금액</span>
            <span>- {formatKoreanCurrency(discountPrice)}</span>
          </Styled.PriceRow>
        )}
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
