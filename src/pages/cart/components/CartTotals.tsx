import { useRecoilValue } from 'recoil';
import noticeIcon from '../../../asset/noticeIcon.png';
import { totalOrderAmountState } from '../../../store/selectors';
import styles from '../Cart.module.css';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import common from '../../../styles/common.module.css';
import { NOTICE_MESSAGE } from '../../../constants/messages';

export default function CartTotals() {
  const { orderAmount, deliveryCharge, totalAmount } = useRecoilValue(totalOrderAmountState);
  return (
    <div className={styles.cartContentWrapper}>
      <div className={styles.cartTotalsNoticeWrapper}>
        <img src={noticeIcon} width={13} height={13} />
        <span className={common.labelText}>{NOTICE_MESSAGE.shipping}</span>
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
