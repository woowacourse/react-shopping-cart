import React from 'react';
import { Items } from '../../types/Item';
import ItemCard from '../ItemCard/ItemCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { itemsState } from '../../recoil/atoms';
import { orderItemsSelector, toggleAllSelector } from '../../recoil/selectors';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';
import * as S from './ItemList.styled';
import { PageType } from '../../types/Page';
import { LABEL } from '../../constants/Label';

interface ItemListProps {
  type: PageType;
}

function ItemList({ type }: ItemListProps) {
  const items = useRecoilValue(
    type === 'cart' ? itemsState : orderItemsSelector,
  );

  const [isAllChecked, setAllChecked] = useRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

  return (
    <S.ItemListContainer>
      {type === 'cart' && (
        <LabeledCheckBox
          label={LABEL.allSelect}
          isChecked={isAllChecked}
          onToggleCheckBox={handleToggleAll}
        />
      )}
      <S.CartItemListContainer>
        {items &&
          items.map((item: Items) => {
            return <ItemCard key={item.id} item={item} type={type} />;
          })}
      </S.CartItemListContainer>
    </S.ItemListContainer>
  );
}

export default ItemList;
