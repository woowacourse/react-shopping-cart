import React from 'react';
import styles from './CheckBox.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ id, checked, onChange, ...rest }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className={styles.checkbox}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id} className={styles.checkboxLabel} />
    </>
  );
}
