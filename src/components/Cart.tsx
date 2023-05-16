import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { KEY_CART, PATH } from '../constants';
import { cartBadgeSelector, cartState } from '../recoil';
import { setDataInLocalStorage } from '../utils/getAndSetDataInLocalStorage';

const Cart = () => {
  const navigator = useNavigate();
  const location = useLocation().pathname;

  const selectedProducts = useRecoilValue(cartBadgeSelector);
  const cart = useRecoilValue(cartState);

  useEffect(() => {
    setDataInLocalStorage(KEY_CART, cart);
  }, [cart]);

  const goToCartPage = () => {
    if (location !== PATH.CART_PAGE) navigator(PATH.CART_PAGE);
  };

  return (
    <S.Wrapper>
      <S.Button onClick={goToCartPage}>장바구니</S.Button>
      <S.Badge role="status" aria-label="장바구니에 담긴 상품 종류의 수">
        {selectedProducts.size}
      </S.Badge>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `,

  Button: styled.button`
    padding: 0;
    margin-right: 8px;
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: #fff;
    cursor: pointer;
  `,

  Badge: styled.span`
    width: 24px;
    height: 24px;
    background: #04c09e;
    border-radius: 50%;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #fff;
  `,
};

export default Cart;
