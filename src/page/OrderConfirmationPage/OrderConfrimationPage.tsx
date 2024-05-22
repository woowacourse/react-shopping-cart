import ConfirmButton from '../../components/ConfirmButton/ConfirmButton';
import ConfirmationContainer from './ConfirmationContainer/ConfirmationContainer';
import Header from '../../components/Header/Header';
import PreviousPageButton from '../../components/PreviousPageButton/PreviousPageButton';
import { Suspense } from 'react';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import styled from '@emotion/styled';

export default function OrderConfirmationPage() {
  return (
    <>
      <Header>
        <PreviousPageButton />
      </Header>
      <Content>
        <TitleContainer title="주문확인" />
        <Suspense>
          <ConfirmationContainer />
        </Suspense>
      </Content>
      <Suspense>
        <ConfirmButton />
      </Suspense>
    </>
  );
}

const Content = styled.section({
  padding: '36px 24px',
  height: '100%',
  flex: '1 0 auto',
});
