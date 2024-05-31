import { useRecoilValue } from 'recoil';
import { orderAmountState, totalAmountState, totalShippingFeeState } from '@store/orderStore';
import { discountAmountState } from '@store/couponStore';
import Divider from '@components/common/Divider/Divider';
import NoticeLabel from '@components/common/NoticeLabel/NoticeLabel';
import { NOTICE_MESSAGE } from '@constants/messages';
import Text from '@components/common/Text/Text';
import formatKoreanCurrency from '@utils/formatKoreanCurrency';
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
      <Text.SubtitleSpaceBetween subtitle="주문 금액" content={formatKoreanCurrency(orderAmount)} />
      <Text.SubtitleSpaceBetween
        subtitle="쿠폰 할인 금액"
        content={discountAmount === 0 ? formattedDiscountAmount : `-${formattedDiscountAmount}`}
      />
      <Text.SubtitleSpaceBetween
        subtitle="배송비"
        content={formatKoreanCurrency(totalShippingFee)}
      />
      <Divider />
      <Text.SubtitleSpaceBetween
        subtitle="총 결제 금액"
        content={formatKoreanCurrency(totalAmount)}
      />
    </div>
  );
}
