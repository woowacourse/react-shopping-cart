import CaptionText from '../../../components/common/CaptionText/CaptionText';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import { CartItemType } from '../../../types';
import common from '../../../styles/common.module.css';
import styles from '../Checkout.module.css';

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
          <CaptionText>{cartItem.product.name}</CaptionText>
          <span className={common.titleText}> {formatKoreanCurrency(cartItem.product.price)}</span>
        </div>
        <CaptionText>{cartItem.quantity}개</CaptionText>
      </div>
    </div>
  );
}
