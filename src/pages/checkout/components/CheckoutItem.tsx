import { CartItemType } from '../../../types';

import common from '../../../styles/common.module.css';
import styles from '../Checkout.module.css';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

interface Props {
  cartItem: CartItemType;
}

export default function CheckoutItem({ cartItem }: Props) {
  return (
    <div className={styles.itemContainer}>
      <div>
        <img
          className={styles.itemImage}
          src={cartItem.product.imageUrl}
          width={100}
          height={100}
          alt={cartItem.product.name}
        />
      </div>

      <div className={styles.itemInfoContainer}>
        <div className={styles.itemNameAndPriceContainer}>
          <span className={common.captionText}> {cartItem.product.name}</span>
          <span className={common.titleText}>
            {' '}
            {formatKoreanCurrency(cartItem.product.price)}원
          </span>
        </div>
        <span className={common.captionText}>{cartItem.quantity}개</span>
      </div>
    </div>
  );
}
