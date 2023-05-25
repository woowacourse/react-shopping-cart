import styled from 'styled-components';
import CartListItem from './CartListItem';
import SelectCartItem from './SelectCartItem';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { cartState } from '../../atoms/cartState';
import { Suspense, useTransition } from 'react';
import CartListHeader from './CartList/CartListHeader';
import ErrorBoundary from '../common/ErrorBoundary';
import { CartType } from '../../type/cart';

interface CartListItemsProps {
  cart: CartType[];
}
function CartListItems({ cart }: CartListItemsProps) {
  return (
    <Suspense>
      {cart.map((cartItem) => (
        <CartListItem key={cartItem.id} {...cartItem} />
      ))}
    </Suspense>
  );
}

export default function CartList() {
  const cart = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    cartState({ action: 'GET' })
  );
  const [inTrans] = useTransition();

  return (
    <CartListContainer>
      <ErrorBoundary>
        <Suspense fallback={<Header>든든 배송 상품 (0개)</Header>}>
          <CartListHeader />
        </Suspense>
        {inTrans ? <div>loading...</div> : null}
        <Suspense>
          <CartListItems cart={cart} />
        </Suspense>
      </ErrorBoundary>
      <Suspense>
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
