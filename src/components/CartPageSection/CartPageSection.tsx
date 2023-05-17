import CartItem from '../CartItem/CartItem';
import styles from './style.module.css';

const CartPageSection = () => {
  return (
    <>
      <div className={styles.cartLstHeader}>장바구니</div>
      <hr />
      <div className={styles.listCount}>든든 배송 상품 (5개)</div>
      <section className={styles.section}>
        <div className={styles.cartList}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className={styles.orderBox}>
          <div className={styles.orderBoxHeader}>결제예상금액</div>

          <div className={styles.orderPrice}>
            <div>
              <div className={styles.resultText}>
                <div>총 상품가격</div>
                <div>21,700원</div>
              </div>
              <div className={styles.resultText}>
                <div>총 배송비</div>
                <div>3,000원</div>
              </div>
            </div>
            <div>
              <div className={styles.resultPrice}>
                <div>총 주문금액</div>
                <div>24,700원</div>
              </div>
              <button className={styles.orderButton} type="button">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPageSection;
