import ROUTES from '../../constants/routes';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import formatKoreanCurrency from '../../utils/formatKoreanCurrency';
import styles from './PaymentsPage.module.css';
import { useRecoilValue } from 'recoil';
import { totalAmountState, totalProductQuantityState } from '../../store/selectors';
import useNavigatePage from '../../hooks/useNavigatePage';

export default function PaymentsPage() {
  const { totalCount, totalQuantity } = useRecoilValue(totalProductQuantityState);
  const totalAmount = useRecoilValue(totalAmountState);

  const navigateCartPage = useNavigatePage(ROUTES.CART);

  return (
    <>
      <Header />
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
          <h2 className={styles.totalAmountNumber}>{formatKoreanCurrency(totalAmount)}</h2>
        </div>
      </div>

      <Button variant="footer" onClick={navigateCartPage}>
        장바구니로 돌아가기
      </Button>
    </>
  );
}
