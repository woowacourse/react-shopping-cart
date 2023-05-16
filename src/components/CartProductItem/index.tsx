import { ReactComponent as TrashBox } from '../../assets/trash-box.svg';
import styles from './index.module.scss';
import type { CartItem } from '../../types';
import CountButton from '../Common/CountButton';
import { ChangeEventHandler } from 'react';
import useCart from '../../hooks/useCart';

interface CartProductItemProps {
  cartItem: CartItem;
  deleteCart: React.MouseEventHandler<HTMLButtonElement>;
  toggleCheck: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

function CartProductItem({ cartItem, deleteCart, toggleCheck, checked }: CartProductItemProps) {
  const { product } = cartItem;
  const { id, name, imageUrl, price } = product;
  const { cartItemState, addQuantity } = useCart(id);

  const handleUpButton = async () => await addQuantity(1);
  const handleDownButton = async () => {
    if (cartItemState.quantity > 0) {
      await addQuantity(-1);
    }
  };

  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles['check-box']} onChange={toggleCheck} checked={checked} />
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles['product-title']}>{name}</div>
          <button onClick={deleteCart}>
            <TrashBox size={24} />
          </button>
        </div>
        <CountButton
          large
          count={cartItemState.quantity}
          handleUpButton={handleUpButton}
          handleDownButton={handleDownButton}
        />
        <div className={styles['product-price']}>{price.toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default CartProductItem;
