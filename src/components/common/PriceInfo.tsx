import styles from './priceInfo.module.css';
import common from '@/common.module.css';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';

type Props = {
  titleText: string;
  price: number;
  className?: string;
};

export default function PriceInfo({ className, titleText, price }: Props) {
  const wrapperClassName = className ? className : styles.wrapper;

  return (
    <div className={wrapperClassName}>
      <span className={common.title_text}>{titleText}</span>
      <span className={styles.price_text}>{formatKoreanCurrency(price)}원</span>
    </div>
  );
}
