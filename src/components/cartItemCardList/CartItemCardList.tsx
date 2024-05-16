import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemsState,
  isAllSelectedState,
  selectedItemsState,
} from '../../recoil/atoms/atoms';
import { ActionButton } from '../button/actionButton/ActionButton';
import { CartItemCard } from '../cartItemCard/CartItemCard';
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from './CartItemCardList.styled';

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
  const [isAllSelected, setIsAllSelected] = useRecoilState(isAllSelectedState);

  useEffect(() => {
    const allSelected = cartItems.every((item) => selectedItems[item.id]);
    setIsAllSelected(allSelected);
  }, [setIsAllSelected]);

  useEffect(() => {
    localStorage.setItem('selectedItemsState', JSON.stringify(selectedItems));
    localStorage.setItem('isAllSelectedState', JSON.stringify(isAllSelected));
  }, []);

  const handleSelectAll = () => {
    const newSelectedItems: Record<number, boolean> = {};
    if (!isAllSelected) {
      cartItems.forEach((item) => {
        newSelectedItems[item.id] = true;
      });
    }

    setSelectedItems(newSelectedItems);
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [id]: !prev[id] };
      return newSelectedItems;
    });
  };

  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <ActionButton
          type='select'
          clicked={isAllSelected}
          onSelect={handleSelectAll}
        />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          {...item}
          selected={!!selectedItems[item.id]}
          onSelect={() => handleSelectItem(item.id)}
        />
      ))}
    </StyledCartItemCardList>
  );
};
