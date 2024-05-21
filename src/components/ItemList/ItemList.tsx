import React from 'react';
import { Items } from '../../types/Item';
import ItemCard from '../ItemCard/ItemCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsState } from '../../recoil/atoms';
import { toggleAllSelector } from '../../recoil/selectors';
import LabeledCheckBox from '../LabeledCheckBox/LabeledCheckBox';
import * as S from './ItemList.styled';
import { PageType } from '../../types/Page';

interface ItemListProps {
  type: PageType;
}

function ItemList({ type }: ItemListProps) {
  const items = useRecoilValue(itemsState);

  const isAllChecked = useRecoilValue(toggleAllSelector);
  const setAllChecked = useSetRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

  return (
    <S.ItemListContainer>
      {type === 'cart' && (
        <LabeledCheckBox
          isAllChecked={isAllChecked}
          handleToggleAll={handleToggleAll}
        />
      )}
      <S.CartItemListContainer>
        {items.map((item: Items) => {
          return <ItemCard key={item.id} item={item} type={type} />;
        })}
      </S.CartItemListContainer>
    </S.ItemListContainer>
  );
}

export default ItemList;
