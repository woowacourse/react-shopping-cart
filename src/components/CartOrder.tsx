import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import cartOrderPriceState from '../recoil/selectors/cartOrderPriceState';

const CartOrderContainer = styled.form`
  min-width: 440px;
  border: 1px solid #dddddd;
`;

const Title = styled.h1`
  padding: 20px 30px;

  font-size: 24px;
  font-weight: 400;
`;

const Divider = styled.hr`
  height: 3px;
  background-color: #dddddd;
`;

const Content = styled.section`
  padding: 30px;
`;

const ContentPlaceholder = styled.h2`
  font-size: 16px;
  text-align: center;
  color: #444444;
`;

const PriceField = styled.p`
  display: flex;
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 700;
`;

const PriceFieldName = styled.p``;

const PriceFieldValue = styled.p`
  margin-left: auto;

  &::after {
    content: '원';
  }
`;

const ContentDivider = styled.hr`
  height: 20px;
  background: transparent;
  border: none;
`;

const OrderButton = styled.button.attrs({ type: 'submit' })`
  padding: 24px;
  width: 100%;

  background-color: #333333;

  font-size: 24px;
  font-weight: 400;
  color: white;
`;

type CartOrderProps = {
  isCartEmpty: boolean;
};

const CartOrder = (props: CartOrderProps) => {
  const { isCartEmpty } = props;
  const prices = useRecoilValue(cartOrderPriceState);

  return (
    <CartOrderContainer>
      <Title>결제예상금액</Title>
      <Divider />

      <Content>
        {isCartEmpty ? (
          <>
            <ContentDivider />
            <ContentPlaceholder>주문할 상품을 선택해주세요!</ContentPlaceholder>
            <ContentDivider />
          </>
        ) : (
          <>
            <PriceField>
              <PriceFieldName>총 상품가격</PriceFieldName>
              <PriceFieldValue>{prices.products}</PriceFieldValue>
            </PriceField>

            <PriceField>
              <PriceFieldName>총 배송비</PriceFieldName>
              <PriceFieldValue>{prices.shippingFee}</PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <PriceField>
              <PriceFieldName>총 주문금액</PriceFieldName>
              <PriceFieldValue>{prices.total}</PriceFieldValue>
            </PriceField>

            <ContentDivider />

            <OrderButton>주문하기</OrderButton>
          </>
        )}
      </Content>
    </CartOrderContainer>
  );
};

export default CartOrder;
