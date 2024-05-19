import CheckIcon from '@assets/check.svg';
import NoneCheckIcon from '@assets/noneCheck.svg';

import * as Styled from './Checkbox.styled';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({ checked, ...props }: CheckboxProps) => {
  return (
    <Styled.Checkbox>
      <Styled.CheckboxInput type="checkbox" {...props}></Styled.CheckboxInput>
      <Styled.CheckIcon $checked={checked} src={checked ? CheckIcon : NoneCheckIcon} alt="check icon" />
    </Styled.Checkbox>
  );
};

export default Checkbox;
