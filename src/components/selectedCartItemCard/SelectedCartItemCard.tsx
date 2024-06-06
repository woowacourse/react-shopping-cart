import { CartItem } from "../../types";
import { formatPrice } from "../../utils/formatPrice";
import {
  StyledCartItemCard,
  StyledProductImg,
  StyledProductInfo,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantity,
} from "./SelectedCartItemCard.styled";

export const SelectedCartItemCard: React.FC<CartItem> = ({ product, quantity }) => {
  const { name, price, imageUrl } = product;

  return (
    <StyledCartItemCard>
      <StyledProductImg src={imageUrl} alt="" />
      <StyledProductInfo>
        <StyledProductName>{name}</StyledProductName>
        <StyledProductPrice>{formatPrice(price)}원</StyledProductPrice>
        <StyledProductQuantity>{quantity}개</StyledProductQuantity>
      </StyledProductInfo>
    </StyledCartItemCard>
  );
};
