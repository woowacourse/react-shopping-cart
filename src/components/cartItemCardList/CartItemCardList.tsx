import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../recoil/atoms";
import { ActionButton } from "../button/ActionButton";
import { CartItemCard } from "../cartItemCard/CartItemCard";
import {
  StyledCartItemCardList,
  StyledCartItemSelectContainer,
  StyledCartItemSelectText,
} from "./CartItemCardList.styled";

export const CartItemCardList: React.FC = () => {
  const cartItems = useRecoilValue(cartItemsState);

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
