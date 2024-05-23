import { useRecoilValue } from 'recoil';
import noticeIcon from '../../../asset/noticeIcon.png';
import {
  deliveryFeeSelector,
  orderAmountSelector,
  totalOrderAmountSelector,
} from '../../../store/selectors';
import styles from '../Cart.module.css';
import PriceInfo from '@/components/common/PriceInfo';

export default function CartTotals() {
  const orderAmount = useRecoilValue(orderAmountSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);
  const totalAmount = useRecoilValue(totalOrderAmountSelector);

  return (
    <div className={styles.cartContentWrapper}>
      <div className={styles.cartTotalsNoticeWrapper}>
        <img src={noticeIcon} width={13} height={13} alt="알림 아이콘" />
        <span className={styles.labelText}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </span>
      </div>
      <div className={styles.cartTotalsWrapper}>
        <PriceInfo titleText="주문 금액" price={orderAmount} />
        <PriceInfo titleText="배송비" price={deliveryFee} />
      </div>
      <div className={styles.cartTotalsWrapper}>
        <PriceInfo titleText="총 결제 금액" price={totalAmount} />
      </div>
    </div>
  );
}
