import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { BACK_ARROW } from '@assets/images';
import CartConfirmContent from '@components/CartConfirm/CartConfirmContent';
import Error from '@components/common/Error';
import Loading from '@components/common/Loading';

import Header from '@components/Header';

export default function CartConfirmPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <button css={backButton} onClick={() => navigate('/')}>
          <img src={BACK_ARROW} alt="뒤로가기 버튼" />
        </button>
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
