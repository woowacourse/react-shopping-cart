import { TrashCan } from '../../assets';
import StepperButton from '../StepperButton/StepperButton';
import styles from './style.module.css';

const CartItem = () => {
  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.deleteCheckerBox}>
          <input className={styles.deleteChecker} type="checkbox" name="willDeleted" />
        </div>
        <img
          className={styles.cartImage}
          src="https://sitem.ssgcdn.com/04/30/92/item/1000047923004_i1_1100.jpg"
          alt="고기임"
        />
        <div className={styles.productName}>
          <p>맛있는 삼겹살</p>
        </div>
        <div className={styles.itemCountDatas}>
          <TrashCan width={16} height={16} />
          <StepperButton count={1} setCount={() => {}} />
          <div>5,100원</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
