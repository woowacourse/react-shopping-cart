import Button from '@/components/common/Button';
import useQuantityCount from '@/hooks/useQuantityCount';
import styles from '../Cart.module.css';

type Props = {
  id: number;
};

export default function CountButton({ id }: Props) {
  const { productQuantity, handleIncrementQuantity, handleDecrementQuantity } =
    useQuantityCount(id);

  return (
    <div className={styles.plusMinusButtonContainer}>
      <Button className={styles.plusMinusButton} onClick={handleDecrementQuantity}>
        -
      </Button>
      <span> {productQuantity} </span>
      <Button className={styles.plusMinusButton} onClick={handleIncrementQuantity}>
        +
      </Button>
    </div>
  );
}
