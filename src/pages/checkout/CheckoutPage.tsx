import { useLocation } from 'react-router-dom';
import Button from '@/components/common/Button';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import styles from './CheckoutPage.module.css';
import CheckoutPageHeader from './components/CheckoutPageHeader';

export default function CheckoutPage() {
  const location = useLocation();
  const {
    state: { totalCount, totalQuantity, totalOrderAmount },
  } = location;

  return (
    <>
      <CheckoutPageHeader />
      <div className={styles.container}>
        <h2 className={styles.mainText}>주문 확인</h2>
        <div className={styles.orderInfoContainer}>
          <p>
            총 {totalCount}종류의 상품 {totalQuantity}개를 주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </div>
        <div className={styles.totalAmount}>
          <h2 className={styles.totalAmountText}>총 결제 금액</h2>
          <h2 className={styles.totalAmountNumber}>{formatKoreanCurrency(totalOrderAmount)}원</h2>
        </div>
      </div>

      <Button variant="footer" disabled={true}>
        결제하기
      </Button>
    </>
  );
}
