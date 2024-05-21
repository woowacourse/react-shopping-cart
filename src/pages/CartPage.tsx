import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Cart from '@components/Cart/Cart';
import Button from '@components/common/Button';
import Error from '@components/common/Error';
import Loading from '@components/common/Loading';

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

      <ErrorBoundary fallbackRender={({ error }) => <Error errorMessage={error.message} />}>
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </ErrorBoundary>
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
