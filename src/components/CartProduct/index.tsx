import styles from './index.module.css';
import type { CartItem } from '../../types';
import CountButton from '../CountButton';
import { ReactComponent as GarbageIcon } from '../../assets/garbage-icon.svg';

interface CartProductProps {
  cartItem: CartItem;
}

const CartProduct = ({ cartItem }: CartProductProps) => {
  const { quantity, product } = cartItem;

  return (
    <section className={styles.container}>
      <div className={styles['product-info-container']}>
        <input className={styles['checkbox-input']} type="checkbox" />
        <div aria-label="image-box">
          <img src={product.imageUrl} alt={product.name} className={styles.image} />
        </div>
        <span aria-label="product-name">{product.name}</span>
      </div>
      <div className={styles['action-container']}>
        <button aria-label="delete-button">
          <GarbageIcon />
        </button>
        <CountButton count={quantity} />
        <span aria-label="product-price">{product.price}원</span>
      </div>
    </section>
  );
};

export default CartProduct;
