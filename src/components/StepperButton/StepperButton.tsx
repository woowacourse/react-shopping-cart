import { ChangeEvent, useCallback } from 'react';

import { AddIcon, MinusIcon } from '../../assets';
import styles from './style.module.css';

interface StepperButtonProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const StepperButton = ({ count, setCount }: StepperButtonProps) => {
  const handleDecrease = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, [setCount]);

  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

  const handleCountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCount(Number(event.target.value));
    },
    [setCount]
  );

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.decreaseButton}
        disabled={count === 1}
        onClick={handleDecrease}
      >
        <MinusIcon />
      </button>
      <input className={styles.count} value={count} onChange={handleCountChange}></input>
      <button type="button" className={styles.increaseButton} onClick={handleIncrease}>
        <AddIcon />
      </button>
    </div>
  );
};

export default StepperButton;
