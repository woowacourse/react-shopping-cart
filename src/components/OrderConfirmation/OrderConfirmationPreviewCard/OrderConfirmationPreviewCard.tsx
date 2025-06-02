import { CartItem } from "@/type/CartItem";

import * as Styled from "./OrderConfirmationPreviewCard.style";

import CartCardImage from "@/components/common/CustomImage";

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
          <CartCardImage imageUrl={imageUrl} />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <Styled.Quantity>{quantity}개</Styled.Quantity>
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default OrderConfirmationPreviewCard;
