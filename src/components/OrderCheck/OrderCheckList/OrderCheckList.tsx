import CartItem from "../../../types/CartItem";
import CartItemCheck from "../../../types/CartItemCheck";
import Item from "../../shoppingCart/Item/Item";

interface OrderCheckListProps {
  cartItemList: CartItem[];
  cartItemCheckList: CartItemCheck[];
}

export default function OrderCheckList({
  cartItemList,
  cartItemCheckList,
}: OrderCheckListProps) {
  return (
    <section>
      {cartItemList.map((cart) => {
        const selected = cartItemCheckList.find((s) => s.id === cart.id);
        return (
          <Item
            key={cart.id}
            id={cart.id}
            isChecked={!!selected?.isClicked}
            imageUrl={cart.product.imageUrl}
            name={cart.product.name}
            price={cart.product.price}
            quantity={cart.quantity}
          />
        );
      })}
    </section>
  );
}
