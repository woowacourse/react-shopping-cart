import CartItem from './CartItem';
import { useData } from '../../context/DataContext';
import { getCartItems } from '../../apis/cart';
import { CartProduct } from '../../types/cart';
import styled from '@emotion/styled';

function CartList() {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  return (
    <Container>
      {cartItems.content.map((item: CartProduct) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
    </Container>
  );
}

export default CartList;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 24px 0 24px 0;
  gap: 24px;
  overflow: auto;
  max-height: 384px;
`;
