import { memo } from "react";
import { useRecoilValue } from "recoil";
import { cartIdAtom } from "../../store/cartState";
import Styled from "./ShoppingCardListStyled";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import Checkbox from "../common/Checkbox/Checkbox";
import useCheckedItem from "../../hooks/useCheckedItem";
import { fetchedShoppingListAtom } from "../../store/fetchState";

const ShoppingCardList = () => {
  const shoppingListId = useRecoilValue(cartIdAtom);
  const fetchedShoppingList = useRecoilValue(fetchedShoppingListAtom);

  const {
    isChecked,
    isCheckedAll,
    countIsChecked,
    changeIsChecked,
    changeIsCheckedAll,
    deleteChecked,
    deleteCheckedAll,
  } = useCheckedItem(shoppingListId.length);

  return (
    <Styled.Container>
      <Styled.Quantity>든든배송 상품 {shoppingListId.length}개</Styled.Quantity>
      <Styled.Border />
      <Styled.ListContainer>
        <Styled.List>
          {shoppingListId.map((id, index) => {
            return (
              <ShoppingCard
                key={id}
                cartId={id}
                isChecked={isChecked[index]}
                deleteChecked={() => {
                  deleteChecked(index);
                }}
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
          전체선택 ({countIsChecked}/{shoppingListId.length})
        </div>
        <Styled.Button onClick={deleteCheckedAll}>선택삭제</Styled.Button>
      </Styled.AllCheckContainer>
    </Styled.Container>
  );
};

export default memo(ShoppingCardList);
