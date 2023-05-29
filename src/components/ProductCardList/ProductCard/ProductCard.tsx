import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import CartQuantityStepper from 'components/CartQuantityStepper/CartQuantityStepper';
import useShoppingCart from 'hooks/useShoppingCart';
import type { Product } from 'types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartProducts, initialAddCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const { id, price, name, imageUrl } = product;
  const targetCartProduct = cartProducts.get(id);
  const cartProductQuantity = targetCartProduct?.quantity ?? 0;

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        <StepperWrapper>
          <CartQuantityStepper
            quantity={cartProductQuantity}
            initialIncrement={() => initialAddCart(product)}
            increaseQuantity={() => increaseQuantity(id)}
            decreaseQuantity={() => decreaseQuantity(id)}
          />
        </StepperWrapper>
      </ProductImgContainer>

      <ProductInfo flexDirection="column" align="flex-start">
        <Title>{name}</Title>
        <Price>{price.toLocaleString('ko-KR')}원</Price>
      </ProductInfo>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  filter: brightness(96%);

  @media (max-width: 360px) {
    width: 100%;
    height: 100%;
  }
`;

const ProductInfo = styled(FlexBox)`
  width: 100%;
  text-align: left;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const StepperWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 8px;
`;

export default ProductCard;
