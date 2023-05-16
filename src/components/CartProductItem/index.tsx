import { ReactComponent as TrashBox } from '../../assets/trash-box.svg';
import styles from './index.module.scss';
import type { CartItem } from '../../types';
import CountButton from '../Common/CountButton';

interface CartProductItemProps {
  cartItem: CartItem;
}

function CartProductItem({ cartItem }: CartProductItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, imageUrl, price } = product;

  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles['check-box']} />
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles['item-info']}>
        <div>
          <div className={styles['product-title']}>{name}</div>
          <TrashBox size={24} />
        </div>
        <CountButton large count={quantity} handleUpButton={() => {}} handleDownButton={() => {}} />
        <div className={styles['product-price']}>{price.toLocaleString()} 원</div>
      </div>
    </div>
  );
}

export default CartProductItem;
