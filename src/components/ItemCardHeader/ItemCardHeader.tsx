import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { MESSAGES } from '../../constants/Messages';
import * as S from './ItemCardHeader.styled';

interface ItemCardHeaderProps {
  isChecked: boolean;
  id: number;
  handleCheckedItem: () => void;
  handleRemoveItem: (id: number) => void;
}

function ItemCardHeader({
  isChecked,
  id,
  handleCheckedItem,
  handleRemoveItem,
}: ItemCardHeaderProps) {
  return (
    <S.CardHeader>
      <CheckBox isChecked={isChecked} onClick={handleCheckedItem} />
      <S.HeaderButton onClick={() => handleRemoveItem(id)}>
        {MESSAGES.delete}
      </S.HeaderButton>
    </S.CardHeader>
  );
}

export default ItemCardHeader;
