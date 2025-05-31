import CartItem from "./CartItem/CartItem";
import * as S from "./CartList.styled";
import useCartItemMutation from "../../../hooks/useCartItemMutation";
import { useCartItemContext } from "@/pages/cart/contexts/CartItemProvider";

type CartListProps = {
  getIsSelected: (id: number) => boolean;
  addSelectedItem: (id: number) => void;
  removeSelectedItem: (id: number) => void;
};

export default function CartList({
  getIsSelected,
  addSelectedItem,
  removeSelectedItem,
}: CartListProps) {
  const { cartItems, refetchCartItems } = useCartItemContext();
  const { updateCartItem, removeCartItem } =
    useCartItemMutation(refetchCartItems);

  const removeSelectedCartItem = async (id: number) => {
    await removeCartItem(id);
    removeSelectedItem(id);
  };

  const handleCheckBoxClick = (id: number, isChecked: boolean) => {
    if (isChecked) {
      removeSelectedItem(id);
      return;
    }

    addSelectedItem(id);
  };

  return (
    <S.List>
      {cartItems?.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          isChecked={getIsSelected(cartItem.id)}
          onCheckBoxClick={handleCheckBoxClick}
          updateCartItem={updateCartItem}
          removeCartItem={removeSelectedCartItem}
        />
      ))}
    </S.List>
  );
}
