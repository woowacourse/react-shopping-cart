import { css } from '@emotion/react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingComponent from '@/LoadingComponent';
import CartMainSection from '@components/Cart/CartMainSection';
import OrderConfirmButton from '@components/Cart/OrderConfirmButton';

import Header from '@components/Header';

function CartPage() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <>
      <Header buttonStyle={homeButton} onClick={handleClickLogo} title="SHOP" />
      <Suspense fallback={<LoadingComponent />}>
        <CartMainSection />
        <OrderConfirmButton />
      </Suspense>
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
