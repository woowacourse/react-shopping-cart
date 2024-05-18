import styles from '../Cart.module.css';

interface Props {
  cartItemsCount: number;
}

export default function CartTitle({ cartItemsCount }: Props) {
  return (
    <div className={styles.cartContentWrapper}>
      <h1 className={styles.titleText}>장바구니</h1>
      <span className={styles.cartTitleCaption}>
        현재 {cartItemsCount}종류의 상품이 담겨있습니다.
      </span>
    </div>
  );
}
