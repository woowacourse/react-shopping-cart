import React from 'react';
import { CheckedBox, NoneCheckedBox } from '../../asset';
import * as S from './CheckBox.styled';

interface CheckBoxProps {
  isChecked: boolean;
  isAvailable?: boolean;
  onClick: (e: React.MouseEvent) => void;
}
function CheckBox({ isChecked, isAvailable = true, onClick }: CheckBoxProps) {
  return (
    <S.CheckBoxImg
      src={isChecked && isAvailable ? CheckedBox : NoneCheckedBox}
      onClick={onClick}
    />
  );
}

export default CheckBox;
