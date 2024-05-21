import styles from '../Cart.module.css';
import common from '@/common.module.css';
import { useCartContext } from '../context/CartContext';

export default function CartTitle() {
  const { allCartItems } = useCartContext();

  return (
    <div className={styles.cartContentWrapper}>
      <h1 className={styles.title_text}>장바구니</h1>
      <span className={styles.cartTitleCaption}>
        현재 {allCartItems.length}종류의 상품이 담겨있습니다.
      </span>
    </div>
  );
}
