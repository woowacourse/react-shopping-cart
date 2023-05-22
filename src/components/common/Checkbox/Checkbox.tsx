import { ComponentPropsWithoutRef } from 'react';

import { CheckedIcon, UncheckedIcon } from '../../../assets';
import * as S from './Checkbox.styles';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {}

const Checkbox = ({ id, checked, ...attributes }: CheckboxProps) => {
  return (
    <label htmlFor={id}>
      <S.CheckboxInput id={id} checked {...attributes} />
      <S.CheckboxIconWrapper aria-label={id}>
        {checked ? <CheckedIcon /> : <UncheckedIcon />}
      </S.CheckboxIconWrapper>
    </label>
  );
};

export default Checkbox;
