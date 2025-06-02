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
            {/* 이상하게 해당 부분에서 계속 충돌이 일어나는데, 이 부분만 이렇게 바꾸었습니다. */}
            <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>
              {quantity}개
            </span>
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default OrderConfirmationPreviewCard;
