import styles from './index.module.scss';

interface PaymentsViewProps {
  priceList: number[];
  parcelPrice: number;
}

function PaymentsView({ priceList, parcelPrice }: PaymentsViewProps) {
  const total = priceList.reduce((acc, productPrice) => productPrice + acc, 0);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>결제예상금액</h2>
      <li className={styles['payments-info']}>
        <ul>
          <span>총 상품가격</span>
          <span>{total}</span>
        </ul>
        <ul>
          <span>총 배송비</span>
          <span>{parcelPrice}</span>
        </ul>
        <ul>
          <span>총 주문금액</span>
          <span>{total + parcelPrice}</span>
        </ul>
      </li>
      <button className={styles['payments-button']}>주문하기</button>
    </section>
  );
}

export default PaymentsView;
