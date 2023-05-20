import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../assets';
import styles from './style.module.css';

interface StepperButtonProps {
  count: number;
  minCount?: number;
  maxCount?: number;
  itemId?: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  increaseCount?: (id: number) => void;
  decreaseCount?: (id: number) => void;
}

const StepperButton = ({
  count,
  minCount = 1,
  maxCount = 99,
  itemId,
  setCount,
  increaseCount,
  decreaseCount,
}: StepperButtonProps) => {
  const handleDecrease = useCallback(() => {
    if (setCount) setCount((prevCount) => prevCount - 1);

    if (decreaseCount && itemId) decreaseCount(itemId);
  }, [setCount, decreaseCount, itemId]);

  const handleIncrease = useCallback(() => {
    if (setCount) setCount((prevCount) => prevCount + 1);

    if (increaseCount && itemId) increaseCount(itemId);
  }, [setCount, increaseCount, itemId]);

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
