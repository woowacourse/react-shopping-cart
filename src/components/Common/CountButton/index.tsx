import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg';
import styles from './index.module.scss';

interface CountButtonProps {
  count: number;
  handleUpButton: React.MouseEventHandler<HTMLButtonElement>;
  handleDownButton: React.MouseEventHandler<HTMLButtonElement>;
  size: 'medium' | 'large';
}

function CountButton({ count, handleUpButton, handleDownButton, size = 'medium' }: CountButtonProps) {
  return (
    <div className={`${styles['counter-container']} ${size === 'large' && styles.large}`}>
      <div>{count}</div>
      <button type="button" onClick={handleUpButton}>
        <ArrowUp />
      </button>
      <button type="button" onClick={handleDownButton}>
        <ArrowDown />
      </button>
    </div>
  );
}

export default CountButton;
