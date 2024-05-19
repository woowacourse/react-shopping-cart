import React from 'react';
import { CheckedBox, NoneCheckedBox } from '../../asset';
import * as S from './CheckBox.styled';

interface CheckBoxProps {
  isChecked: boolean;
  onClick: (e: React.MouseEvent) => void;
}
function CheckBox({ isChecked, onClick }: CheckBoxProps) {
  return (
    <S.CheckBoxImg
      src={isChecked ? CheckedBox : NoneCheckedBox}
      onClick={onClick}
    />
  );
}

export default CheckBox;
