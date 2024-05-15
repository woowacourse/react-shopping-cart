import { ProductType } from '../../../types';
import styles from '../Cart.module.css';
import Button from '../../../components/common/Button';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import { useEffect } from 'react';
import { updateCartItemQuantity } from '../../../api';
import { useRecoilState } from 'recoil';
import { productQuantityState } from '../../../store/atoms';
import { isCheckedState } from '../../../store/atoms';

interface Props extends ProductType {
  quantity: number;
}

export default function CartItem({ id, price, imageUrl, name, quantity }: Props) {
  const [productQuantity, setProductQuantity] = useRecoilState(productQuantityState(id));
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState(id));

  useEffect(() => {
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(isChecked));
  }, []);

  useEffect(() => {
    setProductQuantity(quantity);
  }, []);

  const handleToggleSelect = (id: number) => {
    const newIsChecked = !isChecked;

    setIsChecked(newIsChecked);
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(newIsChecked));
  };

  const handleIncrementButton = async () => {
    const newQuantity = productQuantity + 1;
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) setProductQuantity(newQuantity);
  };

  const handleDecrementButton = async () => {
    const newQuantity = productQuantity - 1;
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) setProductQuantity(newQuantity);
  };

  return (
    <li className={styles.cartItemContainer}>
      <div className={styles.cartItemInputButtonContainer}>
        <input
          type="checkbox"
          id={`item-${id}`}
          checked={isChecked}
          className={styles.customCheckbox}
          onChange={() => handleToggleSelect(id)}
        ></input>
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
            <Button
              className={styles.plusMinusButton}
              variant="image"
              onClick={handleDecrementButton}
            >
              -
            </Button>
            <span> {productQuantity} </span>
            <Button
              className={styles.plusMinusButton}
              variant="image"
              onClick={handleIncrementButton}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
