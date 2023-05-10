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
    <FlexBox flexDirection="column" gap="8px" role="list">
      <ProductImage src={imageUrl} />
      <FlexBox padding="0 4px">
        <FlexBox flexDirection="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')}원</Price>
        </FlexBox>
        <MiniCartIcon width="24px" height="24px" />
      </FlexBox>
    </FlexBox>
  );
};

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export default ProductCard;
