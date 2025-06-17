import * as styles from './PriceArea.style';
import PriceRow from './PriceRow';

interface PriceAreaProps {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
}

function PriceArea({ orderAmount, deliveryFee, totalAmount }: PriceAreaProps) {
  return (
    <section css={styles.priceAreaCss}>
      <div css={styles.infoDeliveryFeeCss}>
        <img src="./assets/info.svg" alt="info icon" />
        <p css={styles.descriptionCss}>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <hr css={styles.hrSss} />
      <PriceRow label="주문 금액" amount={orderAmount} testId="order-amount" />
      <PriceRow label="배송비" amount={deliveryFee} />
      <hr css={styles.hrSss} />
      <PriceRow label="총 결제 금액" amount={totalAmount} testId="total-amount" />
    </section>
  );
}

export default PriceArea;
