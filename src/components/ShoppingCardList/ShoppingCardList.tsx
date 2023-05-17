import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cartIDAtom } from "../../store/cartState";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import { memo } from "react";

const ShoppingCardList = () => {
  const shoppingList = useRecoilValue(cartIDAtom);

  return (
    <Styled.Container>
      <Styled.Quantity>든든배송 상품 {shoppingList.length}개</Styled.Quantity>
      <div>
        <Styled.Border />
        <Styled.List>
          {shoppingList.map((id) => {
            return <ShoppingCard key={id} cartId={id} />;
          })}
        </Styled.List>
      </div>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Quantity: styled.h3`
    font-size: 18px;

    letter-spacing: 0.5px;
  `,
  List: styled.ul`
    width: 58%;
  `,
  Border: styled.hr`
    width: 58%;
    height: 2px;

    background-color: #aaaaaa;
  `,
};

export default memo(ShoppingCardList);
