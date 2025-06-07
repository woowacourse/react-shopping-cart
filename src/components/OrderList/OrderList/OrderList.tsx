import CartItemCheck from "../../../types/CartItemCheck";
import Item from "../../shoppingCart/Item/Item";

interface OrderListProps {
  items: CartItemCheck[];
}

export default function OrderList({ items }: OrderListProps) {
  return (
    <section>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          isChecked={item.isClicked}
          imageUrl={item.product.imageUrl}
          name={item.product.name}
          price={item.product.price}
          quantity={item.quantity}
        />
      ))}
    </section>
  );
}
