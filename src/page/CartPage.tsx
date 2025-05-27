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
