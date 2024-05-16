import { useNavigate, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Button from '../../components/common/Button';
import Header from '../../components/Header/Header';
import BackIcon from '../../asset/back.png';
import formatKoreanCurrency from '../../utils/formatKoreanCurrency';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { totalCount, totalQuantity, totalAmount },
  } = location;

  const handleBackButtonClick = () => {
    navigate(ROUTES.CART);
  };

  return (
    <>
      <Header>
        <Button variant="image" onClick={handleBackButtonClick}>
          <img src={BackIcon} width={32} height={32} alt="back-icon" />
        </Button>
      </Header>
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
          <h2 className={styles.totalAmountNumber}>{formatKoreanCurrency(totalAmount)}원</h2>
        </div>
      </div>

      {/* 다음 미션에서 기능 추가 예정 */}
      <Button variant="footer" disabled={true}>
        결제하기
      </Button>
    </>
  );
}
