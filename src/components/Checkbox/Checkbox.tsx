import styles from './style.module.css';

interface CheckboxProps {
  size: string;
  checked: boolean;
  clickEvent: () => void;
}

const Checkbox = ({ size, checked, clickEvent }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={size === 'small' ? styles.checkboxSmall : styles.checkboxBig}
      checked={checked}
      onClick={clickEvent}
    />
  );
};

export default Checkbox;
