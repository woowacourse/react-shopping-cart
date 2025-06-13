import { CartItemType } from "../../../types/response";
import CartItem from "../CartItem/CartItem/CartItem";
import { ItemContainer } from "../CartItem/CartItem/CartItem.styles";

interface CartItemListProps {
  cartItems: CartItemType[];
  fetchCartItem: () => void;
  isSelected: (cartId: number) => boolean;
  toggleSelect: (cartId: number) => void;
}

function CartItemList({
  cartItems,
  fetchCartItem,
  isSelected,
  toggleSelect,
}: CartItemListProps) {
  return (
    <section css={ItemContainer}>
      {cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            fetchCartItem={fetchCartItem}
            isSelected={isSelected(cartItem.id)}
            toggleSelect={() => toggleSelect(cartItem.id)}
          />
        );
      })}
    </section>
  );
}

export default CartItemList;
