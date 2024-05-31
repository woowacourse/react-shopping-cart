import noticeIcon from '../../../asset/noticeIcon.png';
import styles from '../Cart.module.css';
import PriceInfo from '@/components/common/PriceInfo';
import { useCartManager } from '@/store/custom/useCartManager';
import { useShippingManager } from '@/store/custom/useShippingManager';

export default function CartTotals() {
  const { deliveryFee } = useShippingManager();
  const { totalOrderAmount, orderAmount } = useCartManager();

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
        <PriceInfo titleText="총 결제 금액" price={totalOrderAmount} />
      </div>
    </div>
  );
}
