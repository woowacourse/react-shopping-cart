import Button from '../../../components/common/Button';
import { useRecoilValue } from 'recoil';
import { productQuantityState } from '../../../store/selectors';

import useQuantityCount from '../../../hooks/useQuantityCount';
import useToggleIndividualChecked from '../../../hooks/useToggleIndividualChecked';
import useDeleteProduct from '../../../hooks/useDeleteProduct';
import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';

import { ProductType } from '../../../types';
import styles from '../Cart.module.css';
import common from '../../../styles/common.module.css';
import CheckBox from '../../../components/common/CheckBox/CheckBox';

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
        <Button
          variant="image"
          className={`${styles.deleteButton} ${common.captionText}`}
          onClick={handleDeleteButton}
        >
          삭제
        </Button>
      </div>
      <div className={styles.itemImageAndInfoContainer}>
        <div>
          <img className={styles.itemImage} src={imageUrl} width={100} height={100} alt={name} />
        </div>

        <div className={styles.itemInfoContainer}>
          <span className={common.captionText}> {name}</span>
          <span className={common.titleText}> {formatKoreanCurrency(price)}원</span>
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
