import Button from '@/components/common/Button';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import { useLocation } from 'react-router-dom';
import CheckoutPageHeader from '../checkout/components/CheckoutPageHeader';
import styles from '../checkout/CheckoutPage.module.css';
import OrderSummaryText from './components/OrderSummaryText';

export default function OrderConfirmPage() {
  const location = useLocation();
  const {
    state: { totalCategoryCount, totalOrderQuantity, totalOrderAmount, totalCartItems },
  } = location;

  return (
    <>
      <CheckoutPageHeader />
      <div className={styles.container}>
        <OrderSummaryText
          totalCategoryCount={totalCategoryCount}
          totalOrderQuantity={totalOrderQuantity}
        />
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
