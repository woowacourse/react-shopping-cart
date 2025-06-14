import * as styles from './CartItem.style';
import CheckBox from '../common/CheckBox';
import { RemoveButton } from './RemoveButton';
import * as Card from '../Card/Card';
import Stepper from '../Stepper/Stepper';
import { CartItemType } from '../../types/cartItem';
import { useApiContext } from '../../contexts/ApiContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import getCartItems from '../../api/getCartItem';
import patchCartItem from '../../api/patchCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';

interface CartItemProps {
  item: CartItemType;
  checked: boolean;
  onToggle: () => void;
}

export default function CartItem({ item, checked, onToggle }: CartItemProps) {
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

  const { product, quantity } = item;
  const { name, price, imageUrl } = product;

  return (
    <div css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={onToggle} checked={checked} />
        <RemoveButton onClick={handleRemove} />
      </div>
      <Card.Root>
        <Card.CardImage src={imageUrl} alt={name} />
        <Card.Content>
          <Card.Title>{name}</Card.Title>
          <Card.Price>{(price * quantity).toLocaleString()}원</Card.Price>
          <Stepper
            value={quantity}
            onDecrement={() => handleQuantityChange(quantity - 1)}
            onIncrement={() => handleQuantityChange(quantity + 1)}
          />
        </Card.Content>
      </Card.Root>
    </div>
  );
}
