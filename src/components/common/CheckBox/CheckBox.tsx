import styled from '@emotion/styled';
import { CheckedIcon, UncheckedIcon } from '../../../assets';

interface CheckBoxProps {
  isChecked: boolean;
}

const CheckBox = styled.button<CheckBoxProps>(({ isChecked }) => ({
  width: '24px',
  height: '24px',
  background: `url("${isChecked ? CheckedIcon : UncheckedIcon}") center no-repeat`,
  backgroundSize: 'contain',
  cursor: 'pointer',
}));

export default CheckBox;
