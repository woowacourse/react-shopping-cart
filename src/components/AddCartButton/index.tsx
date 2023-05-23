import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useCart from '../../hooks/useCart';
import CountButton from '../Common/CountButton';
import styles from './index.module.scss';

interface AddCardButtonProps {
  productId: number;
}

function AddCartButton({ productId }: AddCardButtonProps) {
  const { cartItemStateList, addCartItem, mutateQuantity, deleteCartItem } = useCart();
  const cart = cartItemStateList?.find(cartItem => cartItem.product.id === productId);

  const handleClick = async () => {
    await addCartItem(productId);
  };
  const handleUpButton = async () => {
    if (cart) {
      await mutateQuantity(cart.id, cart.quantity + 1);
    }
  };
  const handleDownButton = async () => {
    if (cart) {
      if (cart.quantity <= 1) {
        await deleteCartItem(cart.id);
        return;
      }
      await mutateQuantity(cart.id, cart.quantity - 1);
    }
  };

  return (
    <div className={styles.container}>
      {cart?.product.id === productId ? (
        <CountButton
          count={cart ? cart.quantity : 0}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
          size="medium"
        />
      ) : (
        <button type="button" onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
}
export default AddCartButton;
