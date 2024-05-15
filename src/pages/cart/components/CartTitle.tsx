import styles from '../Cart.module.css';

interface Props {
  productsCount: number;
}

export default function CartTitle({ productsCount }: Props) {
  return (
    <div className={styles.cartContentWrapper}>
      <h1 className={styles.titleText}>장바구니</h1>
      <span className={styles.cartTitleCaption}>
        현재 {productsCount}종류의 상품이 담겨있습니다.
      </span>
    </div>
  );
}
