import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { MESSAGES } from '../../constants/Messages';
import * as S from './ProductCardHeader.styled';

interface ProductCardHeaderProps {
  isChecked: boolean;
  id: number;
  handleCheckedItem: () => void;
  handleRemoveItem: (id: number) => void;
}

function ProductCardHeader({
  isChecked,
  id,
  handleCheckedItem,
  handleRemoveItem,
}: ProductCardHeaderProps) {
  return (
    <S.CardHeader>
      <CheckBox isChecked={isChecked} onClick={handleCheckedItem} />
      <S.HeaderButton onClick={() => handleRemoveItem(id)}>
        {MESSAGES.delete}
      </S.HeaderButton>
    </S.CardHeader>
  );
}

export default ProductCardHeader;
