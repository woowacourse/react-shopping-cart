import CartItemQuantitySelector from './CartItemQuantitySelector';
import { CartItem } from '../types/cart';
import CartItemInfo from './CartItemInfo';
import CartItemHeader from './CartItemHeader';

interface CartItemCardProps {
  cartItem: CartItem;
}

export default function CartItemCard({ cartItem }: CartItemCardProps) {
  return (
    <div data-testid="cart-item-card">
      <CartItemInfo
        header={<CartItemHeader cartItem={cartItem} />}
        cartItem={cartItem}
        quantityContent={<CartItemQuantitySelector cartItem={cartItem} />}
      />
    </div>
  );
}
