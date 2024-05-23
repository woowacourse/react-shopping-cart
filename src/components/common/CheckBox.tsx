import { InputHTMLAttributes } from 'react';
import styles from './checkBox.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
}

export default function CheckBox({ id, ...props }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={`${styles.customCheckbox} ${props.disabled ? styles.disabled : ''}`}
        {...props}
      ></input>
      <label
        htmlFor={id}
        className={`${styles.customCheckboxLabel} ${props.disabled ? styles.disabled : ''}`}
      ></label>
    </>
  );
}
