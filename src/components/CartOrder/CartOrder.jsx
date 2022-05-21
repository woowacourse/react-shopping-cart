import styled from 'styled-components';
import PropTypes from 'prop-types';
import comma from 'utils/comma';

const CartOrder = ({ totalPrice, totalCount, handleClickOrder }) => {
  return (
    <Styled.Section>
      <Styled.TopWrapper>
        <Styled.CartTitle>결제예상금액</Styled.CartTitle>
      </Styled.TopWrapper>
      <Styled.DivideLine />
      <Styled.BottomWrapper>
        <Styled.FlexBetweenBox>
          <Styled.HighlightText>결제예상금액</Styled.HighlightText>
          <Styled.HighlightText>{comma(totalPrice)}원</Styled.HighlightText>
        </Styled.FlexBetweenBox>
        <Styled.FlexCenterBox>
          <Styled.OrderButton
            disabled={totalCount === 0}
            onClick={handleClickOrder}
          >
            주문하기({totalCount}개)
          </Styled.OrderButton>
        </Styled.FlexCenterBox>
      </Styled.BottomWrapper>
    </Styled.Section>
  );
};

CartOrder.propTypes = {
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
  handleClickOrder: PropTypes.func,
};

const Styled = {
  Section: styled.section`
    width: 35%;
    height: 260px;
    margin-top: 80px;
    border: 1px solid #dddddd;
  `,

  TopWrapper: styled.div`
    display: flex;
    align-items: center;
    padding: 16px 30px;
  `,

  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,

  DivideLine: styled.hr`
    width: 100%;
    border: 1px solid #aaaaaa;
    background-color: #aaaaaa;
  `,

  BottomWrapper: styled.div``,

  FlexBetweenBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
  `,

  HighlightText: styled.span`
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

  FlexCenterBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 10px 0 10px;
  `,

  OrderButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2ac1bc;
    font-size: 20px;
    color: white;
    width: 100%;
    padding: 20px;
    border: none;
    cursor: pointer;
  `,
};

export default CartOrder;
