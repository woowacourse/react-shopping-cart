import { useRecoilValue } from 'recoil';
import noticeIcon from '../../../asset/noticeIcon.png';
import { totalOrderAmountState } from '../../../store/selectors';
import styles from '../Cart.module.css';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import common from '../../../styles/common.module.css';

export default function CartTotals() {
  const { orderAmount, deliveryCharge, totalAmount } = useRecoilValue(totalOrderAmountState);
  return (
    <div className={styles.cartContentWrapper}>
      <div className={styles.cartTotalsNoticeWrapper}>
        <img src={noticeIcon} width={13} height={13} />
        <span className={common.labelText}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </span>
      </div>
      <div className={styles.cartTotalsWrapper}>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={common.subtitleText}>주문 금액</span>
          <span className={common.titleText}>{formatKoreanCurrency(orderAmount)}원</span>
        </div>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={common.subtitleText}>배송비</span>
          <span className={common.titleText}>{formatKoreanCurrency(deliveryCharge)}원</span>
        </div>
      </div>
      <div className={styles.cartTotalsWrapper}>
        <div className={styles.cartToTalsTextWrapper}>
          <span className={common.subtitleText}>총 결제 금액</span>
          <span className={common.titleText}>{formatKoreanCurrency(totalAmount)}원</span>
        </div>
      </div>
    </div>
  );
}
