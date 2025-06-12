import CartItem from '../CartItem/CartItem';
import * as S from './CartList.styled';
import { CartItemType } from '@entities/cart';
import { OrderItemIdListType } from '@entities/order';

interface CartListProps {
  cartItems: CartItemType[];
  orderIdList: OrderItemIdListType;
  addOrderItemId: (id: number) => void;
  removeOrderItemId: (id: number) => void;
}

export default function CartList({
  cartItems,
  orderIdList,
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
            isChecked={isChecked}
            addOrderItemId={addOrderItemId}
            removeOrderItemId={removeOrderItemId}
          />
        );
      })}
    </S.List>
  );
}
