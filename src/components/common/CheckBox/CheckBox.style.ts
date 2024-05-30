import styled from '@emotion/styled';
import { CheckedIcon, UncheckedIcon } from '../../../assets';

export const CheckBoxInput = styled.input`
  display: none;
`;

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
}

export const CheckBox = styled.label<CheckBoxProps>(({ isChecked }) => ({
  display: 'inline-block',
  width: '24px',
  height: '24px',
  background: `url("${isChecked ? CheckedIcon : UncheckedIcon}") center no-repeat`,
  backgroundSize: 'contain',
  cursor: 'pointer',
}));
