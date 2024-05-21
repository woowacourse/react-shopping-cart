import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { MESSAGES } from '../../constants/Messages';

import * as S from './LabeledCheckBox.styled';

interface LabeledCheckBoxProps {
  title?: string;
  isAllChecked: boolean;
  handleToggleAll: () => void;
}

function LabeledCheckBox({
  title,
  isAllChecked,
  handleToggleAll,
}: LabeledCheckBoxProps) {
  return (
    <S.LabeledCheckBoxContainer>
      <S.Title>{title}</S.Title>
      <S.CheckBoxContainer>
        <CheckBox isChecked={isAllChecked} onClick={handleToggleAll} />
        {MESSAGES.allSelected}
      </S.CheckBoxContainer>
    </S.LabeledCheckBoxContainer>
  );
}

export default LabeledCheckBox;
