import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

CartPopup.propTypes = {
  isCartPopupShow: PropTypes.bool,
  isInCart: PropTypes.bool,
  isError: PropTypes.bool,
};

function CartPopup({ isCartPopupShow, isInCart, isError }) {
  return (
    <Styled.Wrapper isCartPopupShow={isCartPopupShow}>
      <Styled.Text>
        {isError
          ? 'API 에러가 발생하였습니다.'
          : isInCart
          ? '이미 장바구니에 있는 상품입니다.'
          : '장바구니에 상품이 담겼습니다'}
      </Styled.Text>
      <Styled.CartLink to="/cart">장바구니로 가기</Styled.CartLink>
    </Styled.Wrapper>
  );
}

const Styled = {
  Wrapper: styled.div`
    ${({ isCartPopupShow }) => `
      visibility: ${isCartPopupShow ? 'visible' : 'hidden'};
      opacity: ${isCartPopupShow ? 1 : 0};
    `}
    position: relative;
    top: 10px;
    width: 380px;
    padding: 10px;
    background-color: #00bcd4;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    transition: all 0.5s;
  `,

  Text: styled.span`
    color: #fff;
    margin-right: 10px;
  `,

  CartLink: styled(Link)`
    color: #006eff;
    text-decoration: none;
  `,
};
export default CartPopup;
