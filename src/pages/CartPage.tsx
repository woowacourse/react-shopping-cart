import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import CartMain from '@components/Cart/CartMain';
import OrderConfirmButton from '@components/Cart/OrderConfirmButton';
import Button from '@components/common/Button';

import Header from '@components/Header';

function CartPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header>
        <Button id="home-button" onClick={goHome} css={homeButton}>
          <h1>SHOP</h1>
        </Button>
      </Header>
      <CartMain />
      <OrderConfirmButton />
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
