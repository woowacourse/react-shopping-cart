import styles from './index.module.css';

const PaymentAmount = () => {
  return (
    <section className={styles.container}>
      <header className={styles.title}>
        <h3>결제예상금액</h3>
      </header>
      <main className={styles['payment-box']}>
        <div>
          <span className={styles.label}>총 상품가격</span>
          <span className={styles.value}>21,700</span>
        </div>
        <div>
          <span className={styles.label}>총 배송비</span>
          <span className={styles.value}>3,000</span>
        </div>
        <div>
          <span className={styles.label}>총 주문금액</span>
          <span className={styles.value}>24,700원</span>
        </div>
      </main>
      <footer>
        <button className={styles.button}>주문하기</button>
      </footer>
    </section>
  );
};

export default PaymentAmount;
