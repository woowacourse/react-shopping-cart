import CartItem from './CartItem';
import { Container } from './Cart.styles';
import { useData } from '../../context/DataContext';
import { getCartItems } from '../../apis/cart';
import { CartProduct } from '../../types/cart';

interface CartListProps {
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

function CartList({ checkedItems, setCheckedItems }: CartListProps) {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  return (
    <Container>
      {cartItems.content.map((item: CartProduct) => (
        <CartItem
          key={item.id}
          cartItem={item}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ))}
    </Container>
  );
}

export default CartList;
