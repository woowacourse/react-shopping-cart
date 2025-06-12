import CartItem from './CartItem';
import { useCartItemsData } from '../../hooks/useCartItemsData';
import { useCartSelection } from '../../hooks/useCartSelection';
import { CartProduct } from '../../types/cart';
import styled from '@emotion/styled';

function CartList() {
  const cartItems = useCartItemsData();
  const { checkedItems, toggleItem } = useCartSelection();

  if (!cartItems) {
    return null;
  }

  return (
    <Container>
      {cartItems.content.map((item: CartProduct) => (
        <CartItem
          key={item.id}
          data={item}
          checked={checkedItems.includes(item.id)}
          onCheckChange={() => toggleItem(item.id)}
        />
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
