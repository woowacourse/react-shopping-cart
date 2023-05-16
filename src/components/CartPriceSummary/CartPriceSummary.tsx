import { styled } from 'styled-components';

const CartPriceSummary = () => {
  return (
    <Wrapper>
      <Title>결제예상금액</Title>
      <Content>
        <PriceInfoWrapper>
          <PriceInfo>
            <span>총 상품가격</span>
            <span>24,700원</span>
          </PriceInfo>
          <PriceInfo>
            <span>총 배송비</span>
            <span>3,000원</span>
          </PriceInfo>
        </PriceInfoWrapper>
        <PriceInfo>
          <span>총 주문금액</span>
          <span>27,700원</span>
        </PriceInfo>
        <OrderButton type='button'>주문하기</OrderButton>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 448px;
  height: 410px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  flex: 0 0 81px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 3px solid #ddd;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 38px 30px;
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  background-color: #333;
  color: #fff;
  font-weight: 400;
  font-size: 24px;
  line-height: 21px;
  cursor: pointer;
`;

const PriceInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

const PriceInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  justify-content: space-between;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export default CartPriceSummary;
