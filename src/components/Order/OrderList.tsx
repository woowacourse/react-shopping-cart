import { useOrderSummary } from '../../hooks/useOrderSummary';
import { CartProduct } from '../../types/cart';
import OrderItem from './OrderItem';
import styled from '@emotion/styled';

function OrderList() {
  const { selectedCartItems } = useOrderSummary();

  return (
    <Container>
      {selectedCartItems.map((item: CartProduct) => (
        <OrderItem key={item.id} cartItem={item} />
      ))}
    </Container>
  );
}
export default OrderList;

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
