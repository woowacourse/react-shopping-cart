import styled from 'styled-components';
import { cartTotalState } from '../../../atoms/cartState';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'react';

export default function CartListHeader() {
  const cartTotal = useRecoilValue(cartTotalState);
  const [isPending] = useTransition();

  return (
    <CartListHeaderContainer>
      든든 배송 상품 ({isPending ? 0 : cartTotal}개)
    </CartListHeaderContainer>
  );
}

const CartListHeaderContainer = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray200};
`;
