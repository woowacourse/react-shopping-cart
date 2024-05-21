import styled from '@emotion/styled';
import { CheckedIcon, UncheckedIcon } from '../../../assets';

export const CheckBoxInput = styled.input`
  display: none;
`;

export const CheckBox = styled.label<{ isChecked: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('${(props) => (props.isChecked ? CheckedIcon : UncheckedIcon)}') center no-repeat;
  cursor: pointer;
`;
