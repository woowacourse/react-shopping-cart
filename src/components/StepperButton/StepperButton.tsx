import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../assets';
import styles from './style.module.css';

interface StepperButtonProps {
  count: number;
  minCount?: number;
  maxCount?: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const StepperButton = ({ count, minCount = 1, maxCount = 99, setCount }: StepperButtonProps) => {
  const handleDecrease = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, [setCount]);

  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

  const handleCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (Number(event.target.value) < minCount || Number(event.target.value) > maxCount) return;

      setCount(Number(event.target.value));
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
