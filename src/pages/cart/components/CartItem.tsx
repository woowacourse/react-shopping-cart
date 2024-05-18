import styles from '../Cart.module.css';
import Button from '@/components/common/Button';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import useDeleteProduct from '@/hooks/useDeleteProduct';
import CartItemCheckBox from './CartItemCheckBox';
import { FormattedProduct } from '@/types';
import CountButton from './CountButton';

export default function CartItem({ id, price, imageUrl, name }: FormattedProduct) {
  const { handleDeleteButton } = useDeleteProduct(id);

  return (
    <li className={styles.cartItemContainer}>
      <div className={styles.cartItemInputButtonContainer}>
        <CartItemCheckBox id={id} />
        <Button className={styles.deleteButton} onClick={handleDeleteButton}>
          삭제
        </Button>
      </div>
      <div className={styles.itemImageAndInfoContainer}>
        <div>
          <img className={styles.itemImage} src={imageUrl} width={100} height={100} alt={name} />
        </div>

        <div className={styles.itemInfoContainer}>
          <span className={styles.name}> {name}</span>
          <span className={styles.titleText}> {formatKoreanCurrency(price)}원</span>
          <CountButton id={id} />
        </div>
      </div>
    </li>
  );
}
