import CartItem from './CartItem/CartItem';
import * as S from './CartList.styled';
import { CartItemType, OrderItemType } from '@/apis/cartItems/cartItem.type';

interface CartListProps {
  cartItems: CartItemType[];
  orderIdList: OrderItemType;
  refetchCartItems: () => Promise<void>;
  addOrderItemId: (id: number) => void;
  removeOrderItemId: (id: number) => void;
}

export default function CartList({
  cartItems,
  orderIdList,
  refetchCartItems,
  addOrderItemId,
  removeOrderItemId,
}: CartListProps) {
  return (
    <S.List>
      {cartItems.map((cartItem) => {
        const isChecked = orderIdList.includes(cartItem.id);
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            refetchCartItems={refetchCartItems}
            isChecked={isChecked}
            addOrderItemId={addOrderItemId}
            removeOrderItemId={removeOrderItemId}
          />
        );
      })}
    </S.List>
  );
}
