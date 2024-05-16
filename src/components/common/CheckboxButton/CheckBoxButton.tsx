import { CheckIcon, NoneCheckIcon } from '@assets/index';

import * as Styled from './CheckBoxButton.styled';

interface CheckBoxProps {
  checked: boolean;
}

const CheckBoxButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & CheckBoxProps> = ({
  checked,
  ...props
}) => {
  return (
    <Styled.CheckBoxButton $checked={checked} {...props}>
      {checked ? <CheckIcon /> : <NoneCheckIcon />}
    </Styled.CheckBoxButton>
  );
};

export default CheckBoxButton;
