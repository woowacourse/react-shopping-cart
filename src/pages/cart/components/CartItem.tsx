import { ProductType } from '../../../types';
import styles from '../Cart.module.css';
import Button from '../../../components/common/Button';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import { useEffect } from 'react';
import { deleteCartItem, updateCartItemQuantity } from '../../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productQuantityState, productsIds } from '../../../store/selectors';
import { isCheckedState, productsState } from '../../../store/atoms';
import { CartItemType } from '../../../types';
import areAllItemsChecked from '../../../utils/areAllItemsChecked';

interface Props extends ProductType {
  quantity: number;
  setAllChecked: (value: boolean) => void;
}

export default function CartItem({ id, price, imageUrl, name, setAllChecked }: Props) {
  const [products, setProducts] = useRecoilState(productsState);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState(id));
  const productQuantity = useRecoilValue(productQuantityState(id));
  const productIds = useRecoilValue(productsIds);

  useEffect(() => {
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(isChecked));
  }, []);

  const handleToggleSelect = (id: number) => {
    const newIsChecked = !isChecked;

    setIsChecked(newIsChecked);
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(newIsChecked));

    const isAllChecked = areAllItemsChecked(productIds);

    setAllChecked(isAllChecked);
  };

  const handleIncrementButton = async () => {
    const newQuantity = productQuantity + 1;
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) {
      const newProducts = products.map((product: CartItemType) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });

      setProducts(newProducts);
    }
  };

  const handleDecrementButton = async () => {
    const newQuantity = productQuantity - 1;
    const { success } = await updateCartItemQuantity(id, newQuantity);

    if (success) {
      const newProducts = products.map((product: CartItemType) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });

      setProducts(newProducts);
    }
  };

  const handleDeleteButton = async () => {
    const { success } = await deleteCartItem(id);

    if (success) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      localStorage.removeItem(JSON.stringify(id));
    }
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
        <Button variant="image" className={styles.deleteButton} onClick={handleDeleteButton}>
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
