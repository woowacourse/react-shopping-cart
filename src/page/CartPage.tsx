import { Link } from 'react-router';
import Header from '../components/common/Header';
import { css } from '@emotion/react';
import CartItemList from '../components/CartItemList/CartItemList';
import { useCartItems } from '../hooks/useCartItems';
import * as styles from '../styles/page.style';

function CartPage() {
  const { data: cartItems } = useCartItems();

  return (
    <>
      <Header
        left={
          <Link to="/" css={logoCss}>
            SHOP
          </Link>
        }
      />
      <main css={styles.layoutCss}>
        <h1 css={styles.titleCss}>장바구니</h1>
        {cartItems?.content && cartItems.content.length > 0 ? (
          <>
            <p css={styles.descriptionCss}>총 {cartItems?.content.length}개의 상품이 담겨 있습니다.</p>
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
