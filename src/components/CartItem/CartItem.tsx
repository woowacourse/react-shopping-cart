import * as styles from './CartItem.style';
import { RemoveButton } from './RemoveButton';
import CheckBox from '../common/CheckBox';
import { CartItemType } from '../../types/cartItem';
import patchCartItem from '../../api/patchCartItem';
import { useApiContext } from '../../contexts/ApiContext';
import getCartItems from '../../api/getCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';
import { useErrorContext } from '../../contexts/ErrorContext';
import * as Card from '../Card/Card';
import Stepper from '../Stepper/Stepper';

interface CartItemProps {
  item: CartItemType;
  handleCheckBoxChange: () => void;
  checked: boolean;
}

export default function CartItem({ item, handleCheckBoxChange, checked }: CartItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;
  const { fetcher: refetchCart } = useApiContext({ fetchFn: getCartItems, key: 'getCartItems' });
  const { showError } = useErrorContext();

  const handleMinus = async () => {
    try {
      await patchCartItem(cartItemId, cartQuantity - 1);
      await refetchCart();
    } catch (e) {
      if (e instanceof Error) {
        showError(e);
      }
    }
  };

  const handlePlus = async () => {
    try {
      await patchCartItem(cartItemId, cartQuantity + 1);
      await refetchCart();
    } catch (e) {
      if (e instanceof Error) {
        showError(e);
      }
    }
  };

  const handleDeleteCart = async () => {
    try {
      await deleteCartItem(cartItemId);
      await refetchCart();
    } catch (e) {
      if (e instanceof Error) {
        showError(e);
      }
    }
  };

  return (
    <div key={cartItemId} css={styles.cartItemFrameCss}>
      <div css={styles.cartItemHeaderCss}>
        <CheckBox onChange={handleCheckBoxChange} checked={checked} />
        <RemoveButton onClick={handleDeleteCart} />
      </div>
      <Card.Root>
        <Card.CardImage src={imageUrl} alt={name} />
        <Card.Content>
          <Card.Title>{name}</Card.Title>
          <Card.Price>{(price * cartQuantity).toLocaleString()}원</Card.Price>
          <Stepper value={cartQuantity} onDecrement={handleMinus} onIncrement={handlePlus} />
        </Card.Content>
      </Card.Root>
    </div>
  );
}
