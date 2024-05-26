import { useRecoilValue } from 'recoil';
import Divider from '../../../components/common/Divider/Divider';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import SubtitleSpaceBetween from '../../../components/common/SubtitleSpaceBetween/SubtitleSpaceBetween';
import { NOTICE_MESSAGE } from '../../../constants/messages';

import styles from '../Checkout.module.css';
import { discountAmountState, totalOrderAmountState } from '../../../store/selectors';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

export default function CheckoutTotals() {
  const { orderAmount, deliveryCharge, totalAmount } = useRecoilValue(totalOrderAmountState);
  const discountAmount = useRecoilValue(discountAmountState);

  return (
    <div className={styles.checkoutTotalsContainer}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
      <Divider />
      <SubtitleSpaceBetween subtitle="주문 금액" content={formatKoreanCurrency(orderAmount)} />
      <SubtitleSpaceBetween
        subtitle="쿠폰 할인 금액"
        content={`-${formatKoreanCurrency(discountAmount)}`}
      />
      <SubtitleSpaceBetween subtitle="배송비" content={formatKoreanCurrency(deliveryCharge)} />
      <Divider />
      <SubtitleSpaceBetween subtitle="총 결제 금액" content={formatKoreanCurrency(totalAmount)} />
    </div>
  );
}
