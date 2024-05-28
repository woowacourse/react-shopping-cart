import { ReactNode } from 'react';
import * as S from './Checkbox.style';

export interface CheckboxProps {
  checked: boolean;
  handleClick: () => void;
  areaLabel?: string;
  description?: ReactNode; // Text 컴포넌트를 넣을 수 있도록
  disabled?: boolean;
}

const Checkbox = ({ checked, handleClick, areaLabel = '선택', description, disabled }: CheckboxProps) => {
  return (
    <S.CheckboxWrapper>
      <S.Checkbox checked={checked} onChange={handleClick} area-label={areaLabel} type="checkbox" disabled={disabled} />
      {description}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;
