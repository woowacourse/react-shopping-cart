import { DivideUnderLine } from 'components/shared/styles';
import styled from 'styled-components';
import PropType from 'prop-types';

function Order({ expectedPrice, quantity }) {
  return (
    <Styled.OrderContainer>
      <Styled.OrderTitleWrapper>
        <Styled.OrderTitle>결제예상금액</Styled.OrderTitle>
      </Styled.OrderTitleWrapper>
      <Styled.UnderLine />
      <div>
        <Styled.ExpectedPriceWrapper>
          <Styled.HilightText>결제예상금액</Styled.HilightText>
          <Styled.HilightText>{`${expectedPrice}원`}</Styled.HilightText>
        </Styled.ExpectedPriceWrapper>
        <Styled.OrderButtonWrapper>
          <Styled.OrderButton>{`주문하기(${quantity}개)`}</Styled.OrderButton>
        </Styled.OrderButtonWrapper>
      </div>
    </Styled.OrderContainer>
  );
}

export default Order;

Order.propTypes = {
  expectedPrice: PropType.string.isRequired,
  quantity: PropType.string.isRequired,
};

const Styled = {
  OrderContainer: styled.section`
    width: 35%;
    height: 260px;
    margin-left: 5%;
    margin-top: 80px;
    border: 1px solid #dddddd;
  `,
  OrderTitleWrapper: styled.div`
    display: flex;
    align-items: center;
    padding: 16px 20px;
  `,
  OrderTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
  `,
  UnderLine: styled(DivideUnderLine)`
    border: 1px solid #dddddd;
  `,
  ExpectedPriceWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-top: 20px;
  `,
  HilightText: styled.span`
    position: relative;
    font-weight: 700;
    display: inline-block;
    text-align: center;
    padding: 0 2px;
    font-size: 20px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8px;
      background-color: #2ac1bc;
      opacity: 0.5;
      z-index: -1;
    }
  `,
  OrderButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 10px 0 10px;
  `,
  OrderButton: styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2ac1bc;
    font-size: 24px;
    color: white;
    width: 100%;
    padding: 20px;
  `,
};
