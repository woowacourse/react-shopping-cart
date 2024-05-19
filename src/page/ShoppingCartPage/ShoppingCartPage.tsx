import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { NavigationBar, PageTitle, FooterButton } from '../../components/common';
import { CartContainer } from '../../components/shoppingCart';
import * as Styled from './ShoppingCartPage.style';

import { ENDPOINT } from '../../constants';

import {
  totalAmountState,
  totalCartItemsCountState,
  totalProductsCountState,
} from '../../recoil/selectors';

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  const totalCartItemsCount = useRecoilValue(totalCartItemsCountState);
  const totalProductsCount = useRecoilValue(totalProductsCountState);
  const totalAmount = useRecoilValue(totalAmountState);

  const isConfirmButtonDisabled = totalCartItemsCount === 0;

  const handleClickConfirmButton = () => {
    navigate(ENDPOINT.confirmOrder, {
      state: {
        totalCartItemsCount,
        totalProductsCount,
        totalAmount,
      },
    });
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
        type="button"
        buttonText="주문 확인"
        disabled={isConfirmButtonDisabled}
        onClick={handleClickConfirmButton}
      />
    </>
  );
}
