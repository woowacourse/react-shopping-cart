import * as styles from './CartItem.style';
import CheckBox from '../common/CheckBox';
import { RemoveButton } from './RemoveButton';
import * as Card from '../Card/Card';
import Stepper from '../Stepper/Stepper';
import { CartItemType } from '../../types/cartItem';

interface CartItemProps {
  item: CartItemType;
  checked: boolean;
  onToggle: () => void;
  onQuantityChange: (next: number) => void;
  onRemove: () => void;
}

export default function CartItem({ item, checked, onToggle, onQuantityChange, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const { name, price, imageUrl } = product;

  return (
    <div css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={onToggle} checked={checked} />
        <RemoveButton onClick={onRemove} />
      </div>
      <Card.Root>
        <Card.CardImage src={imageUrl} alt={name} />
        <Card.Content>
          <Card.Title>{name}</Card.Title>
          <Card.Price>{(price * quantity).toLocaleString()}원</Card.Price>
          <Stepper
            value={quantity}
            onDecrement={() => onQuantityChange(quantity - 1)}
            onIncrement={() => onQuantityChange(quantity + 1)}
          />
        </Card.Content>
      </Card.Root>
    </div>
  );
}
