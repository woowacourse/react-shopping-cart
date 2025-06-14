import { Link } from 'react-router';
import Header from '../components/common/Header';
import { css } from '@emotion/react';

import { useApiContext } from '../contexts/ApiContext';
import getCartItems from '../api/getCartItem';
import { useEffect } from 'react';
import { useErrorContext } from '../contexts/ErrorContext';
import CartItemList from '../components/CartItemList/CartItemList';
import { mapToCartItem } from '../domain/mapper/cartItemMapper';

function CartPage() {
  const { data: cartItemData, error } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  const { showError } = useErrorContext();

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const cartItems = cartItemData?.content.map(mapToCartItem) ?? [];

  return (
    <>
      <Header
        left={
          <Link to="/" css={logoCss}>
            SHOP
          </Link>
        }
      />
      <main css={layoutCss}>
        <h1 css={titleCss}>장바구니</h1>
        {cartItems.length !== 0 && <p css={countCss}>총 {cartItems.length}개의 상품이 담겨 있습니다.</p>}
        {cartItems.length !== 0 && <CartItemList cartItems={cartItems} />}
      </main>
    </>
  );
}

export default CartPage;

const logoCss = css({
  color: 'white',
  fontWeight: 800,
  fontSize: '20px'
});

const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 24px',
  height: '100%'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: '700'
});

const countCss = css({
  marginBottom: '16px'
});
