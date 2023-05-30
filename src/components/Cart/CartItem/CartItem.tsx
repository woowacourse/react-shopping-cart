import { TrashCan } from '../../../assets';
import useCartList from '../../../hooks/useCartList';
import { ProductItemType } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Checkbox from '../../utils/Checkbox/Checkbox';
import StepperButton from '../../utils/StepperButton/StepperButton';
import styles from './style.module.css';

interface CartItemProps {
  quantity: number;
  product: ProductItemType;
  itemId: number;
  isChecked: boolean;
  checkHandler: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartItem = ({
  quantity,
  product,
  itemId,
  isChecked,
  checkHandler,
  removeItem,
}: CartItemProps) => {
  const { updateCartItemQuantity } = useCartList();
  const handleUpdateCartItemQuantity = (itemId: number, quantity: number) => {
    updateCartItemQuantity(itemId, quantity);
  };

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.deleteCheckerBox}>
          <Checkbox
            checked={isChecked}
            clickEvent={() => {
              checkHandler(itemId);
            }}
          />
        </div>
        <img className={styles.cartImage} src={product.imageUrl} alt="고기임" />
        <div className={styles.productName}>
          <p>{product.name}</p>
        </div>
        <div className={styles.itemCountDatas}>
          <TrashCan
            width={16}
            height={16}
            onClick={() => {
              removeItem(itemId);
            }}
          />
          <StepperButton
            count={quantity}
            itemId={itemId}
            updateCount={handleUpdateCartItemQuantity}
          />
          <div className={styles.resultPrice}>{priceFormatter(product.price * quantity)}원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
