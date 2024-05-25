import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import * as S from './LabeledCheckBox.styled';

interface LabeledCheckBoxProps {
  title?: string;
  label: string;
  isChecked: boolean;
  onToggleCheckBox: () => void;
}

function LabeledCheckBox({
  title,
  label,
  isChecked,
  onToggleCheckBox,
}: LabeledCheckBoxProps) {
  return (
    <S.LabeledCheckBoxContainer>
      <S.Title>{title}</S.Title>
      <S.CheckBoxContainer>
        <CheckBox isChecked={isChecked} onClick={onToggleCheckBox} />
        {label}
      </S.CheckBoxContainer>
    </S.LabeledCheckBoxContainer>
  );
}

export default LabeledCheckBox;
