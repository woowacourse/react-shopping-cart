import styles from './style.module.css';

interface CheckboxProps {
  checked: boolean;
  clickEvent: () => void;
}

const Checkbox = ({ checked, clickEvent }: CheckboxProps) => {
  return (
    <input type="checkbox" className={styles.checkbox} checked={checked} onClick={clickEvent} />
  );
};

export default Checkbox;
