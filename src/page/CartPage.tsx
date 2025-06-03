import { Link } from 'react-router';
import Header from '../components/common/Header';
import { css } from '@emotion/react';
import CartItemList from '../components/CartItemList/CartItemList';
import { useApiContext } from '../hooks/useApiContext';
import getCartItems from '../api/getCartItem';

function CartPage() {
  const { data: cartItems } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

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
        {cartItems?.content && cartItems.content.length > 0 ? (
          <>
            <p css={countCss}>총 {cartItems?.content.length}개의 상품이 담겨 있습니다.</p>
            <CartItemList cartItems={cartItems?.content} />
          </>
        ) : (
          <p>장바구니에 담은 상품이 없습니다.</p>
        )}
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
