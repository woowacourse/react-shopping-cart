import styled from 'styled-components';
import CartListItem from './CartListItem';
import SelectCartItem from './SelectCartItem';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../atoms/cartState';
import { Suspense } from 'react';
import CartListHeader from './CartList/CartListHeader';
import ErrorBoundary from '../common/ErrorBoundary';

function CartListItems() {
  const cart = useRecoilValue(cartState({ action: 'GET' }));

  return (
    <>
      {cart.map((cartItem) => (
        <CartListItem key={cartItem.id} {...cartItem} />
      ))}
    </>
  );
}

export default function CartList() {
  return (
    <CartListContainer>
      <Suspense fallback={<Header>든든 배송 상품 (0개)</Header>}>
        <CartListHeader />
      </Suspense>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <CartListItems />
        </Suspense>
      </ErrorBoundary>
      <Suspense fallback={<></>}>
        <SelectCartItem />
      </Suspense>
    </CartListContainer>
  );
}

const CartListContainer = styled.div`
  width: 55%;
`;

const Header = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray200};
`;
