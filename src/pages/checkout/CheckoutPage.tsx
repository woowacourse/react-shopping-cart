import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import styles from './CheckoutPage.module.css';
import CheckoutPageHeader from './components/CheckoutPageHeader';
import OrderSummaryText from '@/components/common/OrderSummaryText';
import PriceInfo from '@/components/common/PriceInfo';
import { PAGE_ROUTES } from '@/constants/routes';

export default function CheckoutPage() {
  const location = useLocation();
  const {
    state: { totalCategoryCount, totalOrderQuantity, totalOrderPrice },
  } = location;

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(PAGE_ROUTES.CART);
  };

  return (
    <>
      <CheckoutPageHeader />
      <div className={styles.container}>
        <h2 className={styles.mainText}>주문 확인</h2>
        <OrderSummaryText
          className={styles.orderInfoContainer}
          totalCategoryCount={totalCategoryCount}
          totalOrderQuantity={totalOrderQuantity}
        />
        <div className={styles.totalAmount}>
          <PriceInfo
            className={styles.total_amount_wrapper}
            titleText="총 결제 금액"
            price={totalOrderPrice}
          />
        </div>
      </div>

      <Button variant="footer" onClick={handleBackButtonClick}>
        장바구니로 돌아가기
      </Button>
    </>
  );
}
