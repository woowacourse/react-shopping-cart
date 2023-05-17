import { TrashCan } from '../../assets';
import { useCartList } from '../../hooks/useCartList';
import { ProductItemType } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

interface CartItemProps {
  quantity: number;
  product: ProductItemType;
  itemId: number;
}

const CartItem = ({ quantity, product, itemId }: CartItemProps) => {
  const { updateCartItemQuantityIncrease, updateCartItemQuantityDecrease } = useCartList();
  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.deleteCheckerBox}>
          <input className={styles.deleteChecker} type="checkbox" name="willDeleted" />
        </div>
        <img className={styles.cartImage} src={product.imageUrl} alt="고기임" />
        <div className={styles.productName}>
          <p>{product.name}</p>
        </div>
        <div className={styles.itemCountDatas}>
          <TrashCan width={16} height={16} />
          <StepperButton
            count={quantity}
            setCount={() => {}}
            itemId={itemId}
            increaseCount={updateCartItemQuantityIncrease}
            decreaseCount={updateCartItemQuantityDecrease}
          />
          <div className={styles.resultPrice}>{priceFormatter(product.price * quantity)}원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
