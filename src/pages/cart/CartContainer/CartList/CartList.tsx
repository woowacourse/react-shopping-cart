import CartItem from './CartItem/CartItem';
import * as S from './CartList.styled';
import { CartItemType } from '@/apis/cartItems/cartItem.type';

type CartListProps = {
  cartItems: CartItemType[];
  refetchCartItems: () => Promise<void>;
};

export default function CartList({ cartItems, refetchCartItems }: CartListProps) {
  return (
    <S.List>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} refetchCartItems={refetchCartItems} />
      ))}
    </S.List>
  );
}
