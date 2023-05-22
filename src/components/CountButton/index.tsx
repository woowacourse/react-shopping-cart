import styles from './index.module.css';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';

interface CountButtonProps {
  count: number;
  handleUpButton: React.MouseEventHandler<HTMLButtonElement>;
  handleDownButton: React.MouseEventHandler<HTMLButtonElement>;
  handleInputChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CountButton = ({ count, handleUpButton, handleDownButton, handleInputChange }: CountButtonProps) => {
  return (
    <div className={styles['counter-container']}>
      <div>
        <input value={count} type="number" onChange={handleInputChange} min="0" max="9" />
      </div>
      <button onClick={handleUpButton}>
        <ArrowUp />
      </button>
      <button onClick={handleDownButton}>
        <ArrowDown />
      </button>
    </div>
  );
};

export default CountButton;
