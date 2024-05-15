import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { fetchCartItems } from '@apis/cartItem';
import CartFooterSection from '@components/Cart/CartFooterSection';
import CartHeaderSection from '@components/Cart/CartHeaderSection';
import CartMainSection from '@components/Cart/CartMainSection';
import { cartItemsState } from '@recoil/cartItems';

import Footer from '@components/Footer';
import Header from '@components/Header';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const getCartItems = async () => {
      const result = await fetchCartItems();

      setCartItems(result);
    };

    getCartItems();
  }, []);

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header>
        <button css={homeButton} onClick={goHome}>
          SHOP
        </button>
      </Header>
      <main css={main}>
        <CartHeaderSection cartItemLength={cartItems.length} />
        {cartItems.length ? (
          <>
            <CartMainSection />
            <CartFooterSection />
          </>
        ) : (
          <div css={cartEmptyContainer}>
            <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default CartPage;

const homeButton = css`
  height: 100%;

  padding-left: 24px;

  background-color: inherit;

  font-size: 20px;
  font-weight: 800;
  color: #fff;
`;

const main = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px;

  overflow-y: scroll;
`;

const cartEmptyContainer = css`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const cartEmptyText = css`
  font-size: 16px;
  font-weight: 400;
`;
