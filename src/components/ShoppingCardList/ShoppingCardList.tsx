import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartIdAtom } from "../../store/cartState";
import Styled from "./ShoppingCardListStyled";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import Checkbox from "../common/Checkbox/Checkbox";

const ShoppingCardList = () => {
  const shoppingList = useRecoilValue(cartIdAtom);
  const [isChecked, setIsChecked] = useState<boolean[]>(
    new Array(shoppingList.length).fill(false)
  );
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const changeIsChecked = (index: number) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    if (!newIsChecked[index] && isCheckedAll) setIsCheckedAll(false);
    if (newIsChecked.every((value) => value === true)) setIsCheckedAll(true);

    setIsChecked(newIsChecked);
  };

  const changeIsCheckedAll = () => {
    const newIsCheckedAll = !isCheckedAll;

    setIsCheckedAll(newIsCheckedAll);
    setIsChecked((prev) => {
      return prev.map(() => newIsCheckedAll);
    });
  };

  const deleteCheckedItem = () => {
    isChecked.map((isChecked, index) => {
      if (isChecked) {
        console.log("지우는 로직을 작성해야해요~~", index);
      }
    });
  };

  const countIsChecked = isChecked.reduce((count, value) => {
    return value ? count + 1 : count;
  }, 0);

  return (
    <Styled.Container>
      <Styled.Quantity>든든배송 상품 {shoppingList.length}개</Styled.Quantity>
      <Styled.Border />
      <Styled.ListContainer>
        <Styled.List>
          {shoppingList.map((id, index) => {
            return (
              <ShoppingCard
                key={id}
                cartId={id}
                isChecked={isChecked[index]}
                changeIsChecked={() => {
                  changeIsChecked(index);
                }}
              />
            );
          })}
        </Styled.List>
      </Styled.ListContainer>
      <Styled.AllCheckContainer>
        <Checkbox isChecked={isCheckedAll} onChange={changeIsCheckedAll} />
        <div>
          전체선택 ({countIsChecked}/{shoppingList.length})
        </div>
        <Styled.Button onClick={deleteCheckedItem}>선택삭제</Styled.Button>
      </Styled.AllCheckContainer>
    </Styled.Container>
  );
};

export default memo(ShoppingCardList);
