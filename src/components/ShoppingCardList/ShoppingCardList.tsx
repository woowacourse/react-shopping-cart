import { memo } from "react";
import { useRecoilValue } from "recoil";
import { cartIdAtom } from "../../store/cartState";
import Styled from "./ShoppingCardListStyled";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import Checkbox from "../common/Checkbox/Checkbox";
import useCheckedItem from "../../hooks/useCheckedItem";
import { fetchedShoppingListAtom } from "../../store/fetchState";
import { useFetchShoppingList } from "../../hooks/useFetchProductList";

const ShoppingCardList = () => {
  const shoppingList = useRecoilValue(cartIdAtom);
  const fetchedShoppingList = useRecoilValue(fetchedShoppingListAtom);

  useFetchShoppingList();

  const {
    isChecked,
    isCheckedAll,
    countIsChecked,
    changeIsChecked,
    changeIsCheckedAll,
    deleteChecked,
    deleteCheckedAll,
  } = useCheckedItem(fetchedShoppingList.length);

  return (
    <Styled.Container>
      <Styled.Quantity>
        든든배송 상품 {fetchedShoppingList.length}개
      </Styled.Quantity>
      <Styled.Border />
      <Styled.ListContainer>
        <Styled.List>
          {fetchedShoppingList.map((shopping, index) => {
            return (
              <ShoppingCard
                key={shopping.id}
                cartId={shopping.id}
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
          전체선택 ({countIsChecked}/{shoppingList.length})
        </div>
        <Styled.Button onClick={deleteCheckedAll}>선택삭제</Styled.Button>
      </Styled.AllCheckContainer>
    </Styled.Container>
  );
};

export default memo(ShoppingCardList);
