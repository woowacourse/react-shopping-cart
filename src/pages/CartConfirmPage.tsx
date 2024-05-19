import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { BACK_ARROW } from '@assets/images';
import CartConfirmContent from '@components/CartConfirm/CartConfirmContent';
import Button from '@components/common/Button';
import Error from '@components/common/Error';
import Loading from '@components/common/Loading';

import Header from '@components/Header';

export default function CartConfirmPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Button id="back-button" css={backButton} onClick={() => navigate(-1)}>
          <img src={BACK_ARROW} alt="back arrow icon" />
        </Button>
      </Header>

      <ErrorBoundary fallbackRender={({ error }) => <Error errorMessage={error.message} />}>
        <Suspense fallback={<Loading />}>
          <CartConfirmContent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

const backButton = css`
  padding-left: 24px;

  background-color: inherit;
`;
