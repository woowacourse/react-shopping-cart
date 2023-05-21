import { useRecoilValue } from 'recoil';
import styles from './index.module.css';
import { $CheckedCartState } from '../../recoil/atom';
import useNavigateHome from '../../hooks/useNavigateHome';

const PaymentAmount = () => {
  const handleNavigateHome = useNavigateHome();
  const checkedItems = useRecoilValue($CheckedCartState);
  const totalPrice = checkedItems.reduce((res, { quantity, product }) => {
    res += quantity * product.price;
    return res;
  }, 0);
  return (
    <section className={styles.container}>
      <header className={styles.title}>
        <h3>결제예상금액</h3>
      </header>
      <main className={styles['payment-box']}>
        <div>
          <span className={styles.label}>총 상품가격</span>
          <span className={styles.value}>{totalPrice.toLocaleString()}</span>
        </div>
        <div>
          <span className={styles.label}>총 배송비</span>
          <span className={styles.value}>3,000</span>
        </div>
        <div>
          <span className={styles.label}>총 주문금액</span>
          <span className={styles.value}>{totalPrice === 0 ? 0 : (totalPrice + 3000).toLocaleString()}</span>
        </div>
      </main>
      <footer>
        <button className={styles.button} onClick={handleNavigateHome}>
          주문하기
        </button>
      </footer>
    </section>
  );
};

export default PaymentAmount;
