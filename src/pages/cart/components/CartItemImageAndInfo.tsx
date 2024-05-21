import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import { PropsWithChildren } from 'react';
import styles from './cartItemImageAndInfo.module.css';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  className: string;
};

export default function CartItemImageAndInfo({
  children,
  imageUrl,
  name,
  price,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={className}>
      <div>
        <img className={styles.itemImage} src={imageUrl} width={100} height={100} alt={name} />
      </div>

      <div className={styles.itemInfoContainer}>
        <span className={styles.name}> {name}</span>
        <span className={styles.titleText}> {formatKoreanCurrency(price)}원</span>
        {children}
      </div>
    </div>
  );
}
