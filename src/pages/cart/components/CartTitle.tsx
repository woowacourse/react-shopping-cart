import { useCartManager } from '@/store/custom/useCartManager';
import styles from '../Cart.module.css';

export default function CartTitle() {
  const { totalCartItems } = useCartManager();

  return (
    <div className={styles.cartContentWrapper}>
      <h1 className={styles.title_text}>장바구니</h1>
      <span className={styles.cartTitleCaption}>
        현재 {totalCartItems.length}종류의 상품이 담겨있습니다.
      </span>
    </div>
  );
}
