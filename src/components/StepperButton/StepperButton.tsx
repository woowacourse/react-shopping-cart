import { ChangeEvent, useState } from 'react';

import { AddIcon, MinusIcon } from '../../assets';
import styles from './style.module.css';

const StepperButton = () => {
  const [count, setCount] = useState(0);

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
        disabled={count === 0}
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
