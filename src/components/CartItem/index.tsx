import type { CartItemType } from "../../types";
import CheckBox from "../common/CheckBox";
import CartItemQuantity from "./CartItemQuantity";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem: { id, product } }: CartItemProps) {
  return (
    <li key={id}>
      <CheckBox id={id} />
      <img src={product.imageUrl} />
      <p className="productName">{product.name}</p>
      <div className="price">{product.price}</div>

      <CartItemQuantity itemId={id} />
    </li>
  );
}
