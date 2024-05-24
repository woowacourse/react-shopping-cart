import { ReactNode } from 'react';
import * as S from './Checkbox.style';

export interface CheckboxProps {
  checked: boolean;
  handleClick: () => void;
  alt?: string;
  description?: ReactNode; // Text 컴포넌트를 넣을 수 있도록
}

const Checkbox = ({ checked, handleClick, alt = 'Checkbox', description }: CheckboxProps) => {
  return (
    <>
      <S.Checkbox checked={checked} onChange={handleClick} alt={alt} type="checkbox" />
      {description}
    </>
  );
};

export default Checkbox;
