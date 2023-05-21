import styled from 'styled-components';
import { cartTotalState } from '../../../atoms/cartState';
import { useRecoilValue } from 'recoil';

export default function CartListHeader() {
  const cartTotal = useRecoilValue(cartTotalState);

  return (
    <CartListHeaderContainer>
      든든 배송 상품 ({cartTotal}개)
    </CartListHeaderContainer>
  );
}

const CartListHeaderContainer = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray200};
`;
