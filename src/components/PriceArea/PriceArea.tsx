import { DELIVERY } from '../../constants/delivery';
import * as styles from './PriceArea.style';

interface PriceAreaProps {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
  couponDiscount?: number;
}

function PriceArea({ orderAmount, deliveryFee, totalAmount, couponDiscount }: PriceAreaProps) {
  return (
    <section css={styles.priceAreaCss}>
      <div css={styles.infoDeliveryFeeCss}>
        <img src="./assets/info.svg" alt="info icon" />
        <p css={styles.descriptionCss}>
          총 주문 금액이 {DELIVERY.THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.
        </p>
      </div>
      <hr css={styles.hrSss} />
      <div css={styles.priceRowCss}>
        <p css={styles.priceTitleCss}>주문 금액</p>
        <p css={styles.priceCss} data-testid="order-amount">
          {orderAmount.toLocaleString()}원
        </p>
      </div>
      {couponDiscount !== undefined && (
        <div css={styles.priceRowCss}>
          <p css={styles.priceTitleCss}>쿠폰 할인 금액</p>
          <p css={styles.priceCss} data-testid="coupon-discount">
            -{couponDiscount.toLocaleString()}원
          </p>
        </div>
      )}
      <div css={styles.priceRowCss}>
        <p css={styles.priceTitleCss}>배송비</p>
        <p css={styles.priceCss}>{deliveryFee.toLocaleString()}원</p>
      </div>
      <hr css={styles.hrSss} />
      <div css={styles.priceRowCss}>
        <p css={styles.priceTitleCss}>총 결제 금액</p>
        <p css={styles.priceCss} data-testid="total-amount">
          {totalAmount.toLocaleString()}원
        </p>
      </div>
    </section>
  );
}

export default PriceArea;
