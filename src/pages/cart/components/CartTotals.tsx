import { useRecoilValue } from 'recoil';
import { totalOrderAmountState } from '../../../store/selectors';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import { NOTICE_MESSAGE } from '../../../constants/messages';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

import common from '../../../styles/common.module.css';
import styles from '../Cart.module.css';

export default function CartTotals() {
  const { orderAmount, deliveryCharge, totalAmount } = useRecoilValue(totalOrderAmountState);
  return (
    <div className={styles.cartContentWrapper}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
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
