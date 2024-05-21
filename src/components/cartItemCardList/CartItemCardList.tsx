import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemsState,
  isAllSelectedState,
  selectedItemsState,
} from '../../recoil/atoms/atoms';
import { CartItemCard } from '../itemCard/cartItemCard/CartItemCard';
import { Button } from '../common/button/Button';
import CheckedButtonIcon from '../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../assets/UncheckedButtonIcon.png';
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from './CartItemCardList.styled';
import { selectedItems } from '../../types';

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
  const [isAllSelected, setIsAllSelected] = useRecoilState(isAllSelectedState);

  useEffect(() => {
    const allSelected = cartItems.every(
      (item) => selectedItems[item.id].isSelected === true,
    );
    setIsAllSelected(allSelected);
  }, [cartItems, selectedItems, setIsAllSelected]);

  useEffect(() => {
    localStorage.setItem('selectedItemsState', JSON.stringify(selectedItems));
    localStorage.setItem('isAllSelectedState', JSON.stringify(isAllSelected));
  }, [selectedItems, isAllSelected]);

  const handleSelectAll = () => {
    const newSelectedItems: Record<number, selectedItems> = {};
    const newIsAllSelected = !isAllSelected;
    cartItems.forEach((item) => {
      newSelectedItems[item.id] = {
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        isSelected: newIsAllSelected,
      };
    });
    setSelectedItems(newSelectedItems);
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = {
        ...prev,
        [id]: {
          ...prev[id],
          isSelected: !prev[id].isSelected,
        },
      };
      return newSelectedItems;
    });
  };

  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <Button
          onClick={handleSelectAll}
          iconSrc={isAllSelected ? CheckedButtonIcon : UnCheckedButtonIcon}
        />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          {...item}
          selected={!!selectedItems[item.id].isSelected}
          onSelect={() => handleSelectItem(item.id)}
        />
      ))}
    </StyledCartItemCardList>
  );
};
