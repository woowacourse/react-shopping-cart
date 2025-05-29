import CartItem from './CartItem/CartItem';
import * as S from './CartList.styled';
import { CartItemType } from '@/apis/cartItems/cartItem.type';

type CartListProps = {
  cartItems: CartItemType[];
  orderList: CartItemType[];
  refetchCartItems: () => Promise<void>;
  addOrderItem: (cartItem: CartItemType) => void;
  removeOrderItem: (id: number) => void;
};

export default function CartList({
  cartItems,
  orderList,
  refetchCartItems,
  addOrderItem,
  removeOrderItem,
}: CartListProps) {
  return (
    <S.List>
      {cartItems.map((cartItem) => {
        const isChecked = orderList.some((order) => order.id === cartItem.id);
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            refetchCartItems={refetchCartItems}
            isChecked={isChecked}
            addOrderItem={addOrderItem}
            removeOrderItem={removeOrderItem}
          />
        );
      })}
    </S.List>
  );
}
