import { ChangeEvent } from 'react';

import { AddIcon, MinusIcon } from '../../assets';
import styles from './style.module.css';

interface StepperButtonProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const StepperButton = ({ count, setCount }: StepperButtonProps) => {
  const handleDecrease = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
  };

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
