import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../../assets';
import styles from './style.module.css';

interface StepperButtonProps {
  count: number;
  minCount?: number;
  maxCount?: number;
  itemId: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  updateCount?: (itemId: number, quantity: number) => void;
}

const StepperButton = ({
  count,
  minCount = 1,
  maxCount = 99,
  itemId,
  setCount,
  updateCount,
}: StepperButtonProps) => {
  const handleIncrease = useCallback(() => {
    if (setCount) setCount(count + 1);
    if (updateCount) updateCount(itemId, count + 1);
  }, [count, updateCount, setCount, itemId]);

  const handleDecrease = useCallback(() => {
    if (setCount) setCount(count - 1);
    if (updateCount) updateCount(itemId, count - 1);
  }, [count, updateCount, setCount, itemId]);

  const handleCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (Number(event.target.value) < minCount || Number(event.target.value) > maxCount) return;

      if (setCount) setCount(Number(event.target.value));
    },
    [maxCount, minCount, setCount]
  );

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.decreaseButton}
        aria-label="decrease"
        disabled={count === minCount}
        onClick={handleDecrease}
      >
        <MinusIcon />
      </button>
      <input
        name="count"
        className={styles.count}
        value={count}
        aria-label="count input"
        onChange={handleCountChange}
      ></input>
      <button
        type="button"
        className={styles.increaseButton}
        aria-label="increase"
        disabled={count === maxCount}
        onClick={handleIncrease}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default StepperButton;
