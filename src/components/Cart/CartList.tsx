import CartItem from './CartItem';
import { useData } from '../../context/DataContext';
import { getCartItems } from '../../apis/cart';
import { CartProduct, CartItemsResponse } from '../../types/cart';
import styled from '@emotion/styled';

interface CartListProps {
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

function CartList({ checkedItems, setCheckedItems }: CartListProps) {
  const { data: cartItems } = useData<CartItemsResponse>({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  if (!cartItems) {
    return null;
  }

  const handleItemCheck = (itemId: number, checked: boolean) => {
    setCheckedItems((prev) => (checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)));
  };

  return (
    <Container>
      {cartItems.content.map((item: CartProduct) => (
        <CartItem
          key={item.id}
          data={item}
          checked={checkedItems.includes(item.id)}
          onCheckChange={(checked) => handleItemCheck(item.id, checked)}
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
