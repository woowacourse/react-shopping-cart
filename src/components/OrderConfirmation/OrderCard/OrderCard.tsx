import { CartItem } from "../../../type/CartItem";

import * as Styled from "./OrderCard.style";

interface OrderCardProps {
  cartItem: CartItem;
}

function OrderCard({ cartItem }: OrderCardProps) {
  const { product, quantity } = cartItem;
  const { name, price, imageUrl } = product;

  return (
    <li>
      <Styled.Container>
        <Styled.Wrapper>
          <Styled.Image src={imageUrl} alt={`${name} 상품 이미지`} />
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

export default OrderCard;
