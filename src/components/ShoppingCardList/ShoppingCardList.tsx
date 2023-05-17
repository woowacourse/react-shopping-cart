import { memo } from "react";
import { useRecoilValue } from "recoil";
import { cartIDAtom } from "../../store/cartState";
import Styled from "./ShoppingCardListStyled";
import ShoppingCard from "../ShoppingCard/ShoppingCard";

const ShoppingCardList = () => {
  const shoppingList = useRecoilValue(cartIDAtom);

  return (
    <Styled.Container>
      <Styled.Quantity>든든배송 상품 {shoppingList.length}개</Styled.Quantity>
      <Styled.Border />
      <Styled.ListContainer>
        <Styled.List>
          {shoppingList.map((id) => {
            return <ShoppingCard key={id} cartId={id} />;
          })}
        </Styled.List>
      </Styled.ListContainer>
    </Styled.Container>
  );
};

export default memo(ShoppingCardList);
