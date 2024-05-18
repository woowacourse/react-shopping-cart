import styles from '../Cart.module.css';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';

type Props = {
  titleText: string;
  price: number;
};

export default function CartResultInfo({ titleText, price }: Props) {
  return (
    <div className={styles.cartToTalsTextWrapper}>
      <span className={styles.subtitleText}>{titleText}</span>
      <span className={styles.titleText}>{formatKoreanCurrency(price)}원</span>
    </div>
  );
}
