import CartItemContainer from '../CartItemContainer/CartItemContainer';
import OrderAmount from '../OrderAmount/OrderAmount';
import { cartItemsState } from '../../recoil/selectors';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

export default function CartContainer() {
  const items = useRecoilValue(cartItemsState);

  if (items.length === 0) {
    return <EmptyCartContainer>장바구니에 담은 상품이 없습니다.</EmptyCartContainer>;
  }

  return (
    <>
      <CartItemContainer />
      <OrderAmount />
    </>
  );
}

const EmptyCartContainer = styled.div({
  width: '100%',
  height: '100%',
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  color: '#0A0D13',
  fontSize: '16px',
  fontWeight: '400',
});
