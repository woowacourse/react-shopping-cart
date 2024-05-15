import { ProductType } from '../../../types';
import styles from '../Cart.module.css';
import Button from '../../../components/common/Button';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

export default function CartItem({ id, price, imageUrl, name }: ProductType) {
  return (
    <li className={styles.cartItemContainer}>
      <div className={styles.cartItemInputButtonContainer}>
        {/* <input type={'checkbox'} /> */}
        <input type="checkbox" id={`item-${id}`} className={styles.customCheckbox}></input>
        <label htmlFor={`item-${id}`} className={styles.customCheckboxLabel}></label>
        <Button variant="image" className={styles.deleteButton}>
          삭제
        </Button>
      </div>
      <div className={styles.itemImageAndInfoContaner}>
        <div>
          <img className={styles.itemImage} src={imageUrl} width={100} height={100} alt={name} />
        </div>

        <div className={styles.itemInfoContainer}>
          <span className={styles.name}> {name}</span>
          <span className={styles.titleText}> {formatKoreanCurrency(price)}원</span>
          <div className={styles.plusMinusButtonContainer}>
            <Button className={styles.plusMinusButton} variant="image">
              -
            </Button>
            <span> 2 </span>
            <Button className={styles.plusMinusButton} variant="image">
              +
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
