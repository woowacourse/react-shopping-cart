import { useRecoilValue } from 'recoil';
import {
  orderAmountState,
  totalAmountState,
  totalShippingFeeState,
} from '../../../store/orderStore';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import Divider from '../../../components/common/Divider/Divider';
import Text from '../../../components/common/Text/Text';
import { NOTICE_MESSAGE } from '../../../constants/messages';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import styles from '../Cart.module.css';

export default function CartTotals() {
  const orderAmount = useRecoilValue(orderAmountState);
  const { baseShippingFee } = useRecoilValue(totalShippingFeeState);
  const totalAmount = useRecoilValue(totalAmountState);
  return (
    <div className={styles.cartTotalsContainer}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
      <Divider />
      <Text.SubtitleSpaceBetween
        subtitle="주문 금액"
        content={`${formatKoreanCurrency(orderAmount)}`}
      />
      <Text.SubtitleSpaceBetween
        subtitle="배송비"
        content={`${formatKoreanCurrency(baseShippingFee)}`}
      />
      <Divider />
      <Text.SubtitleSpaceBetween
        subtitle="총 결제 금액"
        content={`${formatKoreanCurrency(totalAmount)}`}
      />
    </div>
  );
}
