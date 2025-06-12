import styled from '@emotion/styled';
import { CartProduct } from '../../types/cart';

interface CartOrderItemProps {
  cart: CartProduct[];
}

function CartOrderItem({ cart }: CartOrderItemProps) {
  return (
    <Container>
      {cart.map((cartItem: CartProduct) => (
        <ProductSection key={cartItem.id}>
          <ProductImage src={cartItem.product.imageUrl} alt={cartItem.product.name} />
          <ProductInfo>
            <ProductName>{cartItem.product.name}</ProductName>
            <ProductPrice>{cartItem.product.price.toLocaleString()}원</ProductPrice>
            <ProductQuantity>{cartItem.quantity}개</ProductQuantity>
          </ProductInfo>
        </ProductSection>
      ))}
    </Container>
  );
}

export default CartOrderItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

const ProductSection = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const ProductPrice = styled.p`
  margin: 4px 0 0 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;

const ProductQuantity = styled.p`
  margin: 24px 0 0 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;
