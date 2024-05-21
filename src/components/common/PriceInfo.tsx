import styles from './priceInfo.module.css';
import common from '@/common.module.css';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';

type Props = {
  titleText: string;
  price: number;
};

export default function PriceInfo({ titleText, price }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={common.title_text}>{titleText}</span>
      <span className={styles.price_text}>{formatKoreanCurrency(price)}원</span>
    </div>
  );
}
