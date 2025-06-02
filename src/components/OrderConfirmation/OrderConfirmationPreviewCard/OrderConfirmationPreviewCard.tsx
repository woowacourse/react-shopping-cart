import { CartItem } from "@/type/CartItem";

import * as Styled from "./OrderConfirmationPreviewCard.style";

import CustomImage from "@/components/common/CustomImage";

interface OrderConfirmationPreviewCardProps {
  cartItem: CartItem;
}

function OrderConfirmationPreviewCard({
  cartItem,
}: OrderConfirmationPreviewCardProps) {
  const { product, quantity, id } = cartItem;
  const { name, price, imageUrl } = product;

  return (
    <li key={id}>
      <Styled.Container>
        <Styled.Wrapper>
          <CustomImage imageUrl={imageUrl} />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <Styled.CartItemQuantity>{quantity}개</Styled.CartItemQuantity>
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default OrderConfirmationPreviewCard;
