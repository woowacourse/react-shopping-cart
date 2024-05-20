import { allCartItemStates } from '@/store/atoms';
import styles from '../Cart.module.css';
import { useRecoilValue } from 'recoil';

export default function CartTitle() {
  const cartItems = useRecoilValue(allCartItemStates);

  return (
    <div className={styles.cartContentWrapper}>
      <h1 className={styles.titleText}>장바구니</h1>
      <span className={styles.cartTitleCaption}>
        현재 {cartItems.length}종류의 상품이 담겨있습니다.
      </span>
    </div>
  );
}
