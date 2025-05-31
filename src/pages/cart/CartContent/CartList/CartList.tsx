import CartItem from "./CartItem/CartItem";
import * as S from "./CartList.styled";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

type CartListProps = {
  cartItems: CartItemType[];
  orderList: CartItemType[];
  refetchCartItems: () => Promise<void>;
  addSelectedItem: (id: number) => void;
  removeSelectedItem: (id: number) => void;
};

export default function CartList({
  cartItems,
  orderList,
  refetchCartItems,
  addSelectedItem,
  removeSelectedItem,
}: CartListProps) {
  console.log(cartItems);
  console.log(orderList);
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
            addSelectedItem={addSelectedItem}
            removeSelectedItem={removeSelectedItem}
          />
        );
      })}
    </S.List>
  );
}
