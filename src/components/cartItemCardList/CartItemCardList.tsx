import { ActionButton } from "../button/ActionButton";
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from "./CartItemCardList.styled";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import { cartItems } from "../../mockData";

export const CartItemCardList: React.FC = () => {
  return (
    <StyledCartItemCardList>
      <StyledCartItemSelectContainer>
        <ActionButton type="select" />
        <StyledCartItemSelectText>전체선택</StyledCartItemSelectText>
      </StyledCartItemSelectContainer>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} checked={false} {...item} />
      ))}
    </StyledCartItemCardList>
  );
};
