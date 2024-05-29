import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { fetchCartItems } from '@/apis/cartItem';
import { THEME } from '@/constants/theme';
import { cartItemsState } from '@/recoil/cartItems/atoms';

const ReturnCartButton = () => {
  const navigate = useNavigate();
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleClickReturnCart = async () => {
    navigate('/');
  };

  useEffect(() => {
    const getCartItems = async () => {
      const newCartItems = await fetchCartItems();
      setCartItems(newCartItems);
    };

    getCartItems();
  }, [setCartItems]);

  return (
    <button css={returnCartButton} onClick={handleClickReturnCart}>
      장바구니로 돌아가기
    </button>
  );
};

export default ReturnCartButton;

const returnCartButton = css`
  width: 100%;
  height: 64px;

  background-color: ${THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
