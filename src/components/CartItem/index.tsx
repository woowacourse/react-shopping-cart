import type { CartItem } from '../../types';
import CartItemQuantity from './CartItemQuantity';

interface CartItemProps {
  cartItem: CartItem;
}

export default function CartItem({
  cartItem: { id, product, isSelected },
}: CartItemProps) {
  return (
    <li key={id}>
      <input type="checkbox" checked={isSelected} />
      <img src={product.imageUrl} />
      <p className="productName">{product.name}</p>
      <div className="price">{product.price}</div>

      <CartItemQuantity itemId={id} />
    </li>
  );
}
