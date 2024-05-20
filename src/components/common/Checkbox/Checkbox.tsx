import CheckIcon from '@assets/check.svg';
import NoneCheckIcon from '@assets/noneCheck.svg';

import * as Styled from './Checkbox.styled';

interface CheckBoxProps {
  checked: boolean;
}

const CheckBox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & CheckBoxProps> = ({ checked, ...props }) => {
  return (
    <Styled.CheckboxWrapper $checked={checked}>
      <Styled.Checkbox type="checkbox" checked={checked} {...props} />
      <Styled.CheckboxImage src={checked ? CheckIcon : NoneCheckIcon} />
    </Styled.CheckboxWrapper>
  );
};

export default CheckBox;
