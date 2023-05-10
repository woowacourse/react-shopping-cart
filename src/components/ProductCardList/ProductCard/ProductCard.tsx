import FlexBox from 'components/@common/FlexBox';
import { ReactComponent as MiniCartIcon } from 'assets/mini-cart-icon.svg';
import { Product } from 'types/product';
import styled from 'styled-components';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, price, name, imageUrl } = product;

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        <AddCartButton>
          <MiniCartIcon />
        </AddCartButton>
      </ProductImgContainer>
      <FlexBox padding="0 4px">
        <FlexBox flexDirection="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

const AddCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 12px;
  right: 8px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  cursor: pointer;
`;

export default ProductCard;
