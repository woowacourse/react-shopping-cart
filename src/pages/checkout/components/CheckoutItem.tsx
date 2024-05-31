import Text from '../../../components/common/Text/Text';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import { CartItemType } from '../../../types';
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
          <Text.Caption>{cartItem.product.name}</Text.Caption>
          <Text.Title> {formatKoreanCurrency(cartItem.product.price)}</Text.Title>
        </div>
        <Text.Caption>{cartItem.quantity}개</Text.Caption>
      </div>
    </div>
  );
}
