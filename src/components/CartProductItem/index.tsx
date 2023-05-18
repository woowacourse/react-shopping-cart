import { ReactComponent as TrashBox } from '../../assets/trash-box.svg';
import styles from './index.module.scss';
import type { CartItem } from '../../types';
import CountButton from '../Common/CountButton';
import { ChangeEventHandler } from 'react';
import useCart from '../../hooks/useCart';

interface CartProductItemProps {
  cartItem: CartItem;
  refresh: () => void;
  toggleCheck: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

function CartProductItem({ cartItem, refresh, toggleCheck, checked }: CartProductItemProps) {
  const { product, quantity } = cartItem;
  const { id, name, imageUrl, price } = product;
  const { cartItemState, addQuantity, deleteCartItem } = useCart(id);

  const handleUpButton = async () => {
    await addQuantity(1);
    refresh();
  };
  const handleDownButton = async () => {
    if (cartItemState && cartItemState.quantity > 1) {
      await addQuantity(-1);
      refresh();
    }
  };

  const handleDeleteButton = async () => {
    await deleteCartItem();
    refresh();
  };

  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles['check-box']} onChange={toggleCheck} checked={checked} />
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles['product-title']}>{name}</div>
          <button onClick={handleDeleteButton}>
            <TrashBox size={24} />
          </button>
        </div>
        <CountButton
          large
          count={cartItemState ? cartItemState.quantity : 0}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
        />
        <div className={styles['product-price']}>{(price * quantity).toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default CartProductItem;
