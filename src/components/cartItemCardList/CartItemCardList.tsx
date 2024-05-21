import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState, checkedItemState, isAllCheckedState } from "../../recoil/atoms/atoms";
import { CheckboxButton } from "../button";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import {
  StyledCartItemCardList,
  StyledCartItemCheckContainer,
  StyledCartItemCheckText,
} from "./CartItemCardList.styled";

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const [chekcedItems, setCheckedItems] = useRecoilState(checkedItemState);
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState);

  useEffect(() => {
    const allChecked = cartItems.every((item) => chekcedItems[item.id]);
    setIsAllChecked(allChecked);
  }, [cartItems, chekcedItems, setIsAllChecked]);

  useEffect(() => {
    localStorage.setItem("checkedItemState", JSON.stringify(chekcedItems));
    localStorage.setItem("isAllCheckedState", JSON.stringify(isAllChecked));
  }, [chekcedItems, isAllChecked]);

  const handleCheckAll = () => {
    const newCheckedItem: Record<number, boolean> = {};
    if (!isAllChecked) {
      cartItems.forEach((item) => {
        newCheckedItem[item.id] = true;
      });
    }

    setCheckedItems(newCheckedItem);
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckItem = (id: number) => {
    setCheckedItems((prev) => {
      const newCheckedItem = { ...prev, [id]: !prev[id] };
      return newCheckedItem;
    });
  };

  return (
    <StyledCartItemCardList>
      <StyledCartItemCheckContainer>
        <CheckboxButton isChecked={isAllChecked} onCheck={handleCheckAll} />
        <StyledCartItemCheckText>전체선택</StyledCartItemCheckText>
      </StyledCartItemCheckContainer>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          {...item}
          isChecked={!!chekcedItems[item.id]}
          onCheck={() => handleCheckItem(item.id)}
        />
      ))}
    </StyledCartItemCardList>
  );
};
