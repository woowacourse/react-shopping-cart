import Divider from '../../../components/common/Divider/Divider';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import SubtitleSpaceBetween from '../../../components/common/SubtitleSpaceBetween/SubtitleSpaceBetween';
import { NOTICE_MESSAGE } from '../../../constants/messages';

import styles from '../Checkout.module.css';

export default function CheckoutTotals() {
  return (
    <div className={styles.checkoutTotalsContainer}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
      <Divider />
      <SubtitleSpaceBetween subtitle="주문 금액" content="70,000원" />
      <SubtitleSpaceBetween subtitle="쿠폰 할인 금액" content="-6,000원" />
      <SubtitleSpaceBetween subtitle="배송비" content="6,000원" />
      <Divider />
      <SubtitleSpaceBetween subtitle="총 결제 금액" content="70,000원" />
    </div>
  );
}
