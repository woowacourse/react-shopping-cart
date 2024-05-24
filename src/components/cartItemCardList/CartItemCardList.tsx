import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemsState, selectedItemsState } from '../../recoil/atoms/atoms';
import { CartItemCard } from '../itemCard/cartItemCard/CartItemCard';
import { Button } from '../common/button/Button';
import CheckedButtonIcon from '../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../assets/UncheckedButtonIcon.png';
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from './CartItemCardList.styled';
import { CartItemProps } from '../../types';

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item));
    }
  };

  const isSelected = (item: CartItemProps) => {
    return (
      selectedItems.find((selectedItem) => selectedItem.id === item.id) !==
      undefined
    );
  };

  const handleSelectItem = (item: CartItemProps) => {
    if (isSelected(item)) {
      setSelectedItems((prev) =>
        prev.filter((selectedItem) => selectedItem.id !== item.id),
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <Button
          onClick={handleSelectAll}
          iconSrc={
            selectedItems.length === cartItems.length
              ? CheckedButtonIcon
              : UnCheckedButtonIcon
          }
        />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          {...item}
          selected={isSelected(item)}
          onSelect={() => handleSelectItem(item)}
        />
      ))}
    </StyledCartItemCardList>
  );
};
