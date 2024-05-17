import { css } from '@emotion/react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import CartConfirmMainSection from '../components/CartConfirmMainSection';

import Header from '@/components/common/Header';
import LoadingComponent from '@/components/common/LoadingComponent';
import { BACK_ARROW } from '@assets/images';

export default function CartConfirmPage() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header buttonStyle={button} onClick={handleClickBack}>
        <img src={BACK_ARROW} />
      </Header>
      <Suspense fallback={<LoadingComponent />}>
        <CartConfirmMainSection />
      </Suspense>
    </>
  );
}

const button = css`
  padding-left: 24px;

  background-color: inherit;
`;
