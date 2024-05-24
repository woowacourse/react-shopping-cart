import CheckIcon from '@assets/check.svg';
import NoneCheckIcon from '@assets/noneCheck.svg';

import * as Styled from './Checkbox.styled';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & CheckboxProps> = ({ checked, ...props }) => {
  return (
    <Styled.CheckboxWrapper $checked={checked}>
      <Styled.Checkbox type="checkbox" checked={checked} {...props} />
      <Styled.CheckboxImage src={checked ? CheckIcon : NoneCheckIcon} />
    </Styled.CheckboxWrapper>
  );
};

export default Checkbox;
