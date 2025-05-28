import { Link } from 'react-router';
import Header from '../components/Header';
import { css } from '@emotion/react';
import Button from '../components/Button';
import CartItemList from '../components/CartItemList';
import { useApiContext } from '../contexts/ApiContext';
import getCartItems from '../api/getCartItem';

function CartPage() {
  const { data: carItems } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });

  return (
    <>
      <Header
        left={
          <Link to="/confirm" css={logoCss}>
            SHOP
          </Link>
        }
      />
      <main css={layoutCss}>
        <h1 css={titleCss}>장바구니</h1>
        {carItems?.content.length !== 0 && <p>총 {carItems?.content.length}개의 상품이 담겨 있습니다.</p>}
        {carItems?.content && <CartItemList cartItems={carItems.content} />}
      </main>

      <Button>주문 확인</Button>
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
