import classNames from 'classnames/bind';
import { ChangeEventHandler } from 'react';

import css from './Checkbox.module.css';

const cn = classNames.bind(css);

interface CheckboxProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export function Checkbox({ checked, onChange, value }: CheckboxProps) {
  return <input className={cn('input')} value={value} type='checkbox' checked={checked} onChange={onChange} />;
}
