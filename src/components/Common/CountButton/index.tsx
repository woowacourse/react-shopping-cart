import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg';
import styles from './index.module.scss';

interface CountButtonProps {
  count: number;
  handleUpButton: React.MouseEventHandler<HTMLButtonElement>;
  handleDownButton: React.MouseEventHandler<HTMLButtonElement>;
  large?: boolean;
}

function CountButton({ count, handleUpButton, handleDownButton, large = false }: CountButtonProps) {
  return (
    <div className={`${styles['counter-container']} ${large && styles.large}`}>
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
