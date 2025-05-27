import { Link } from 'react-router';
import Header from '../components/Header';
import { css } from '@emotion/react';
import Button from '../components/Button';

function CartPage() {
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
        <section>
          <h1 css={titleCss}>장바구니</h1>
        </section>
        <div css={cartItemsAreaCss}>
          <p>장바구니에 담은 상품이 없습니다.</p>
        </div>
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
  justifyContent: 'center',
  padding: '36px 24px',
  height: '100%'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: '700'
});

const cartItemsAreaCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1
});
