import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';

interface CountButtonProps {
  getCount: (count: number) => void;
}

function CountButton({ getCount }: CountButtonProps) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    getCount(count);
  }, [count, getCount]);

  const upCount = () => {
    setCount(prev => prev + 1);
  };

  const downCount = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className={styles['counter-container']}>
      <div>{count}</div>
      <button onClick={upCount}>
        <ArrowUp />
      </button>
      <button onClick={downCount}>
        <ArrowDown />
      </button>
    </div>
  );
}

export default CountButton;
