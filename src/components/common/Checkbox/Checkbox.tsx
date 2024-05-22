import * as S from './Checkbox.style';

import CHECK_TRUE from '../../../assets/check-true.svg';
import CHECK_FALSE from '../../../assets/check-false.svg';

export interface CheckboxProps {
  state: boolean;
  handleClick: () => void;
}

const Checkbox = ({ state, handleClick }: CheckboxProps) => {
  return (
    <S.CheckboxLabel>
      <S.Checkbox type="checkbox" checked={state} onChange={handleClick} />
      <S.CheckboxImage src={state ? CHECK_TRUE : CHECK_FALSE} alt="체크박스" />
    </S.CheckboxLabel>
  );
};

export default Checkbox;
