import styled from 'styled-components';
import Button from '@components/common/Button';

const CartExpectedPrice = () => {
  return (
    <CartExpectedPriceWrapper>
      <CartExpectedPriceTitle>결제예상금액</CartExpectedPriceTitle>
      <CartExpectedPriceFirstInformationWrapper>
        <CartPriceWrapper>
          <CartPriceTextWrapper>총 상품가격</CartPriceTextWrapper>
          <CartPriceTextWrapper>21,700</CartPriceTextWrapper>
        </CartPriceWrapper>
        <CartPriceWrapper>
          <CartPriceTextWrapper>총 배송비</CartPriceTextWrapper>
          <CartPriceTextWrapper>3,000</CartPriceTextWrapper>
        </CartPriceWrapper>
      </CartExpectedPriceFirstInformationWrapper>
      <CartExpectedPriceSecondInformationWrapper>
        <CartPriceWrapper>
          <CartPriceTextWrapper>총 주문금액</CartPriceTextWrapper>
          <CartPriceTextWrapper>24,700</CartPriceTextWrapper>
        </CartPriceWrapper>
        <CartPriceButtonWrapper>
          <Button text="주문하기" onClick={() => {}} width="80%" />
        </CartPriceButtonWrapper>
      </CartExpectedPriceSecondInformationWrapper>
    </CartExpectedPriceWrapper>
  );
};

const CartExpectedPriceWrapper = styled.div`
  width: 30%;
  max-height: 410px;

  border: 1px solid #dddddd;
`;

const CartExpectedPriceTitle = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  /* or 138% */

  letter-spacing: 0.5px;

  color: #333333;

  padding: 20px 30px;

  border-bottom: 3px solid #dddddd;
`;

const CartExpectedPriceFirstInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  
  padding: 10%;
`;

const CartExpectedPriceSecondInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

  padding: 10%;
`;

const CartPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartPriceTextWrapper = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  /* identical to box height, or 133% */

  text-align: center;
  letter-spacing: 0.5px;

  color: #333333;
`;

const CartPriceButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
`;

export default CartExpectedPrice;
