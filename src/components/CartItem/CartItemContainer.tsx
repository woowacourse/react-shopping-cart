import CartItem from './CartItem';
import { useApiContext } from '../../contexts/ApiContext';
import getCartItems from '../../api/getCartItem';
import patchCartItem from '../../api/patchCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';
import { useErrorContext } from '../../contexts/ErrorContext';
import { CartItemType } from '../../types/cartItem';

interface CartItemContainerProps {
  item: CartItemType;
  checked: boolean;
  onToggle: () => void;
}
export default function CartItemContainer({ item, checked, onToggle }: CartItemContainerProps) {
  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });
  const { showError } = useErrorContext();

  const handleQuantityChange = async (next: number) => {
    try {
      await patchCartItem(item.id, next);
      await refetchCart();
    } catch (e) {
      showError(e as Error);
    }
  };

  const handleRemove = async () => {
    try {
      await deleteCartItem(item.id);
      await refetchCart();
    } catch (e) {
      showError(e as Error);
    }
  };

  return (
    <CartItem
      item={item}
      checked={checked}
      onToggle={onToggle}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  );
}
