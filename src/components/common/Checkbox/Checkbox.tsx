import CheckIcon from '@assets/check.svg';
import NoneCheckIcon from '@assets/noneCheck.svg';

import * as Styled from './Checkbox.styled';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({ checked, ...props }: CheckboxProps) => {
  return (
    <Styled.Checkbox $checked={checked}>
      <Styled.CheckboxInput type="checkbox" {...props}></Styled.CheckboxInput>
      <Styled.CheckIconWrapper>
        <Styled.CheckIcon src={checked ? CheckIcon : NoneCheckIcon} alt="체크 박스 체크 아이콘" />
      </Styled.CheckIconWrapper>
    </Styled.Checkbox>
  );
};

export default Checkbox;
