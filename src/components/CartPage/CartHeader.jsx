import styled from 'styled-components';

function CartHeader() {
  return (
    <Styled.CartHeaderWrapper>
      <Styled.CartHeaderText>장바구니</Styled.CartHeaderText>
      <Styled.UnderLine />
    </Styled.CartHeaderWrapper>
  );
}

export default CartHeader;

const Styled = {
  CartHeaderWrapper: styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `,
  CartHeaderText: styled.h2`
    font-size: 32px;
    font-weight: 600;
  `,
  UnderLine: styled.hr`
    width: 100%;
    border: 2px solid black;
    margin-top: 20px;
  `,
};
