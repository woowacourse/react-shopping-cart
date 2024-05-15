import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartItemsState,
  isAllSelectedState,
  selectedItemsState,
} from "../../recoil/atoms";
import { ActionButton } from "../button/ActionButton";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from "./CartItemCardList.styled";
import { useEffect } from "react";

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
  const [isAllSelected, setIsAllSelected] = useRecoilState(isAllSelectedState);

  useEffect(() => {
    setIsAllSelected(
      cartItems.length > 0 && selectedItems.size === cartItems.length
    );
  }, [cartItems, selectedItems, setIsAllSelected]);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <ActionButton
          type="select"
          clicked={isAllSelected}
          onSelect={handleSelectAll}
        />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} {...item} />
      ))}
    </StyledCartItemCardList>
  );
};
