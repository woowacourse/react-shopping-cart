import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import { NavigationBar, PageTitle, FooterButton } from '../../components/common';
import { CartContainer } from '../../components/shoppingCart';
import * as Styled from './ShoppingCartPage.style';

import { ENDPOINTS } from '../../constants';

import {
  totalAmountState,
  totalCartItemsCountState,
  totalProductsCountState,
} from '../../recoil/selectors';

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  const totalCartItemsCount = useRecoilValueLoadable(totalCartItemsCountState);
  const totalProductsCount = useRecoilValueLoadable(totalProductsCountState);
  const totalAmount = useRecoilValueLoadable(totalAmountState);

  const isConfirmButtonDisabled =
    totalCartItemsCount.state !== 'hasValue' || totalCartItemsCount.contents === 0;

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
      <NavigationBar>SHOP</NavigationBar>
      <Styled.CartContent>
        <PageTitle title="장바구니" />
        <Suspense fallback={<div>로딩 중입니다...</div>}>
          <CartContainer />
        </Suspense>
      </Styled.CartContent>
      <FooterButton
        buttonText="주문 확인"
        disabled={isConfirmButtonDisabled}
        onClick={handleClickConfirmButton}
      />
    </>
  );
}
