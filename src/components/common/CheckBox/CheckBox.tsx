import React from 'react';
import checkedImg from '../../../asset/checked.png';
import uncheckedImg from '../../../asset/unchecked.png';
import styles from './CheckBox.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ id, checked = false, onChange, ...rest }: Props) {
  const checkBoxLabelStyle = checked ? 'checkboxLabel' : 'unCheckboxLabel';
  return (
    <>
      <label htmlFor={`checkbox-${id}`} className={styles[checkBoxLabelStyle]}>
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          checked={checked}
          className={styles.checkbox}
          onChange={onChange}
          {...rest}
        />
        <div className={styles.checkBoxImgWrapper}>
          <img src={checked ? checkedImg : uncheckedImg}></img>
        </div>
      </label>
    </>
  );
}
