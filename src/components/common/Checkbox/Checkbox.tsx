import { ComponentPropsWithoutRef } from 'react';

import { CheckedIcon, UncheckedIcon } from '../../../assets';
import * as S from './Checkbox.styles';

interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  isChecked: boolean;
}

const Checkbox = ({ isChecked, ...attributes }: CheckboxProps) => {
  return (
    <label>
      <S.CheckboxInput {...attributes} />
      <S.CheckboxIconWrapper>
        {isChecked ? <CheckedIcon /> : <UncheckedIcon />}
      </S.CheckboxIconWrapper>
    </label>
  );
};

export default Checkbox;
