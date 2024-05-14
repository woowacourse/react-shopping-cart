import * as Styled from './OrderPrice.styled';

const OrderPrice = () => {
  return (
    <Styled.OrderPrice>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <span>주문 금액</span>
          <span>70,000원</span>
        </Styled.PriceRow>
        <Styled.PriceRow>
          <span>배송비</span>
          <span>3,000원</span>
        </Styled.PriceRow>
      </Styled.PriceGroup>
      <Styled.PriceGroup>
        <Styled.PriceRow>
          <span>총 결제 금액</span>
          <span>73,000원</span>
        </Styled.PriceRow>
      </Styled.PriceGroup>
    </Styled.OrderPrice>
  );
};

export default OrderPrice;
