import styled from 'styled-components';
import CartListItem from './CartListItem';
import SelectCartItem from './SelectCartItem';
import { useRecoilValue } from 'recoil';
import { cartState, cartTotalState } from '../../atoms/cartState';

export default function CartList() {
  const cart = useRecoilValue(cartState({ action: 'GET' }));
  const cartTotal = useRecoilValue(cartTotalState);

  return (
    <CartListContainer>
      <CartListHeader>든든 배송 상품 ({cartTotal}개)</CartListHeader>
      {cart.map((cartItem) => (
        <CartListItem key={cartItem.id} {...cartItem} />
      ))}
      <SelectCartItem />
    </CartListContainer>
  );
}

const CartListContainer = styled.div`
  width: 55%;
`;

const CartListHeader = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray200};
`;
