import { useRecoilValue } from 'recoil';
import noticeIcon from '../../../asset/noticeIcon.png';
import { deliveryFee, orderAmount, totalOrderAmount } from '../../../store/selectors';
import styles from '../Cart.module.css';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

export default function CartTotals() {
  const orderAmountValue = useRecoilValue(orderAmount);
  const deliveryFeeValue = useRecoilValue(deliveryFee);
  const totalAmountValue = useRecoilValue(totalOrderAmount);

  return (
    <div className={styles.cartContentWrapper}>
      <div className={styles.cartTotalsNoticeWrapper}>
        <img src={noticeIcon} width={13} height={13} />
        <span className={styles.labelText}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </span>
      </div>
      <div className={styles.cartTotalsWrapper}>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={styles.subtitleText}>주문 금액</span>
          <span className={styles.titleText}>{formatKoreanCurrency(orderAmountValue)}원</span>
        </div>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={styles.subtitleText}>배송비</span>
          <span className={styles.titleText}>{formatKoreanCurrency(deliveryFeeValue)}원</span>
        </div>
      </div>
      <div className={styles.cartTotalsWrapper}>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={styles.subtitleText}>총 결제 금액</span>
          <span className={styles.titleText}>{formatKoreanCurrency(totalAmountValue)}원</span>
        </div>
      </div>
    </div>
  );
}
