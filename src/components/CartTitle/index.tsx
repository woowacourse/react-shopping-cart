import { styled } from 'styled-components';

const CartTitle = () => {
  return <CartTitleWrapper>장바구니</CartTitleWrapper>;
};

const CartTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 125px;
  border-bottom: 4px solid #333333;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  /* identical to box height, or 117% */

  text-align: center;
  letter-spacing: 0.5px;
`;

export default CartTitle;
