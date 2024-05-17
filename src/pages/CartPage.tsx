import { css } from '@emotion/react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/common/Header';
import LoadingComponent from '@/components/common/LoadingComponent';
import CartMainSection from '@components/Cart/CartMainSection';
import OrderConfirmButton from '@components/Cart/OrderConfirmButton';

function CartPage() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <>
      <Header buttonStyle={homeButton} onClick={handleClickLogo}>
        SHOP
      </Header>
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
