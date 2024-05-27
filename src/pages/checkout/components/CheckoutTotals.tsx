import { useRecoilValue } from 'recoil';
import {
  orderAmountState,
  totalAmountState,
  totalShippingFeeState,
} from '../../../store/orderStore';
import { discountAmountState } from '../../../store/couponStore';
import Divider from '../../../components/common/Divider/Divider';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import SubtitleSpaceBetween from '../../../components/common/SubtitleSpaceBetween/SubtitleSpaceBetween';
import { NOTICE_MESSAGE } from '../../../constants/messages';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import styles from '../Checkout.module.css';

export default function CheckoutTotals() {
  const orderAmount = useRecoilValue(orderAmountState);
  const discountAmount = useRecoilValue(discountAmountState);
  const { totalShippingFee } = useRecoilValue(totalShippingFeeState);
  const totalAmount = useRecoilValue(totalAmountState);

  const formattedDiscountAmount = formatKoreanCurrency(discountAmount);
  return (
    <div className={styles.checkoutTotalsContainer}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
      <Divider />
      <SubtitleSpaceBetween subtitle="주문 금액" content={formatKoreanCurrency(orderAmount)} />
      <SubtitleSpaceBetween
        subtitle="쿠폰 할인 금액"
        content={
          formattedDiscountAmount === '0원'
            ? formattedDiscountAmount
            : `-${formattedDiscountAmount}`
        }
      />
      <SubtitleSpaceBetween subtitle="배송비" content={formatKoreanCurrency(totalShippingFee)} />
      <Divider />
      <SubtitleSpaceBetween subtitle="총 결제 금액" content={formatKoreanCurrency(totalAmount)} />
    </div>
  );
}
