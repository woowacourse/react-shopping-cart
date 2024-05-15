import { CartItem } from "../../types";
import { ActionButton } from "../button/ActionButton";
import {
  StyledCartItemCard,
  StyledCartItemCardHeader,
  StyledCartItemCardProductContents,
  StyledProductImg,
  StyledProductInfo,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from "./CartItemCard.styled";

interface CartItemProps extends CartItem {
  checked: boolean;
}

export const CartItemCard: React.FC<CartItemProps> = ({
  checked,
  product,
  quantity,
}) => {
  const { name, price, imageUrl } = product;

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
        <ActionButton type="select" clicked={checked} />
        <ActionButton type="delete" />
      </StyledCartItemCardHeader>
      <StyledCartItemCardProductContents>
        <StyledProductImg src={imageUrl} alt="" />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price}</StyledProductPrice>
          <StyledProductQuantityContainer>
            <ActionButton type="minus" />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <ActionButton type="plus" />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
