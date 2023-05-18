import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import useCart from '../../hooks/useCart';
import CountButton from '../Common/CountButton';
import styles from './index.module.scss';
import type { Product } from '../../types';

interface AddCardButtonProps {
  product: Product;
  id: number;
}

function AddCartButton({ product, id }: AddCardButtonProps) {
  const { cartItemState, addCartItem, addQuantity, deleteCartItem } = useCart(id);

  const handleClick = async () => {
    await addCartItem(product);
  };
  const handleUpButton = async () => {
    await addQuantity(1);
  };
  const handleDownButton = async () => {
    if (cartItemState && cartItemState.quantity <= 1) {
      await deleteCartItem();
      return;
    }
    await addQuantity(-1);
  };

  return (
    <div className={styles.container}>
      {cartItemState?.product.id === id ? (
        <CountButton
          count={cartItemState ? cartItemState.quantity : 0}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
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
