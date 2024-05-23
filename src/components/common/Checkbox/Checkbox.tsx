import * as S from './Checkbox.style';

import CHECK_TRUE from '../../../assets/check-true.svg?react';
import CHECK_FALSE from '../../../assets/check-false.svg?react';

export interface CheckboxProps {
  state: boolean;
  handleClick: () => void;
  disabled: boolean;
}

const Checkbox = ({ state, handleClick, disabled }: CheckboxProps) => {
  return (
    <S.CheckboxLabel>
      <S.Checkbox
        type="checkbox"
        checked={state}
        onChange={handleClick}
        disabled={disabled}
      />
      {state ? <CHECK_TRUE /> : <CHECK_FALSE />}
    </S.CheckboxLabel>
  );
};

export default Checkbox;
