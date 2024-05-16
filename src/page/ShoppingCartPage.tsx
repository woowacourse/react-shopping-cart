import { Suspense } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '../components/Header/Header';
import TitleContainer from '../components/TitleContainer/TitleContainer';
import CartContainer from '../components/CartContainer/CartContainer';
import ConfirmButton from '../components/ConfirmButton/ConfirmButton';
import ENDPOINTS from '../constants/endpoints';

import {
  totalAmountState,
  totalCartItemsCountState,
  totalProductsCountState,
} from '../recoil/selectors';

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  const totalCartItemsCount = useRecoilValueLoadable(totalCartItemsCountState);
  const totalProductsCount = useRecoilValueLoadable(totalProductsCountState);
  const totalAmount = useRecoilValueLoadable(totalAmountState);

  const handleClickConfirmButton = () => {
    if (
      totalCartItemsCount.state === 'hasValue' &&
      totalProductsCount.state === 'hasValue' &&
      totalAmount.state === 'hasValue'
    ) {
      navigate(ENDPOINTS.confirmOrder, {
        state: {
          totalCartItemsCount: totalCartItemsCount.contents,
          totalProductsCount: totalProductsCount.contents,
          totalAmount: totalAmount.contents,
        },
      });
    }
  };

  return (
    <>
      <Header>SHOP</Header>
      <Content>
        <TitleContainer title="장바구니" />
        <Suspense fallback={<div>로딩 중입니다...</div>}>
          <CartContainer />
        </Suspense>
      </Content>
      <Suspense>
        <ConfirmButton onClick={handleClickConfirmButton} />
      </Suspense>
    </>
  );
}

const Content = styled.section({
  padding: '36px 24px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
});
