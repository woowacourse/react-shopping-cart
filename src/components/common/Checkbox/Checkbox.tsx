import { CheckIcon, NoneCheckIcon } from '@assets/index';

import * as Styled from './Checkbox.styled';

interface CheckBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
}

const CheckBox = ({ checked, onClick, ...props }: CheckBoxProps) => {
  return (
    <Styled.CheckBoxButton $checked={checked} onClick={onClick} {...props}>
      {checked ? <CheckIcon /> : <NoneCheckIcon />}
    </Styled.CheckBoxButton>
  );
};

export default CheckBox;
