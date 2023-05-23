import styles from './index.module.scss';

interface PaymentsViewProps {
  priceTotal?: number;
  parcelPrice: number;
}

function PaymentsView({ priceTotal = 0, parcelPrice }: PaymentsViewProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>결제예상금액</h2>
      <li className={styles['payments-info']}>
        <ul>
          <span>총 상품가격</span>
          <span>{priceTotal.toLocaleString()} 원</span>
        </ul>
        <ul>
          <span>총 배송비</span>
          <span>{parcelPrice.toLocaleString()} 원</span>
        </ul>
        <ul>
          <span>총 주문금액</span>
          <span>{(priceTotal + parcelPrice).toLocaleString()} 원</span>
        </ul>
      </li>
      <button type="button" className={styles['payments-button']}>
        주문하기
      </button>
    </section>
  );
}

export default PaymentsView;
