import { useRecoilValue } from 'recoil';
import { productQuantityState } from '../../../store/productStore';
import { ProductType } from '../../../types';
import useQuantityCount from '../../../hooks/useQuantityCount';
import useToggleIndividualChecked from '../../../hooks/useToggleIndividualChecked';
import useDeleteProduct from '../../../hooks/useDeleteProduct';
import Button from '../../../components/common/Button';
import CheckBox from '../../../components/common/CheckBox/CheckBox';
import Text from '../../../components/common/Text/Text';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import styles from '../Cart.module.css';

interface Props extends ProductType {
  quantity: number;
  isChecked: boolean;
  setAllChecked: (value: boolean) => void;
}

export default function CartItem({ id, price, imageUrl, name, isChecked, setAllChecked }: Props) {
  const { handleIncrementButton, handleDecrementButton } = useQuantityCount({ id });
  const productQuantity = useRecoilValue(productQuantityState(id));
  const { handleToggleSelect } = useToggleIndividualChecked({ id, setAllChecked });
  const { handleDeleteButton } = useDeleteProduct({ id });

  return (
    <li className={styles.cartItemContainer}>
      <div className={styles.cartItemInputButtonContainer}>
        <CheckBox id={`item-${id}`} checked={isChecked} onChange={() => handleToggleSelect(id)} />
        <Button variant="image" className={`${styles.deleteButton}`} onClick={handleDeleteButton}>
          <Text.Caption>삭제</Text.Caption>
        </Button>
      </div>
      <div className={styles.itemImageAndInfoContainer}>
        <div>
          <img className={styles.itemImage} src={imageUrl} width={100} height={100} alt={name} />
        </div>

        <div className={styles.itemInfoContainer}>
          <Text.Caption>{name}</Text.Caption>
          <Text.Title>{formatKoreanCurrency(price)}</Text.Title>
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
