import { ReactComponent as ShopIcon } from '../../assets/mini-shop-icon.svg';
import CountButton from '../Common/CountButton';
import useCart from '../../hooks/useCart';
import styles from './index.module.scss';
import type { Product } from '../../types';

interface AddCardButtonProps {
  product: Product;
  id: number;
}

function AddCartButton({ product, id }: AddCardButtonProps) {
  const { cartItemState, addCartItem, addQuantity, deleteCartItem } = useCart(id);

  const handleClick = async () => await addCartItem(product);
  const handleUpButton = async () => await addQuantity(1);
  const handleDownButton = async () => {
    if (cartItemState && cartItemState.quantity <= 1) {
      return await deleteCartItem();
    }
    return await addQuantity(-1);
  };

  return (
    <div className={styles['container']}>
      {cartItemState?.product.id === id ? (
        <CountButton
          count={cartItemState ? cartItemState.quantity : 0}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
        />
      ) : (
        <button onClick={handleClick}>
          <ShopIcon />
        </button>
      )}
    </div>
  );
}
export default AddCartButton;
