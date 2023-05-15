import * as Styled from './ProductItem.styles.tsx';
import ProductQuantityController from '../ProductQuantityController/ProductQuantityController.tsx';

export type ProductItemProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const ProductItem = ({ id, name, price, imageUrl }: ProductItemProps) => {
  return (
    <Styled.ProductItemWrapper data-cy='productItem'>
      <Styled.ImageOverflowContainer>
        <Styled.ImageContainer>
          <Styled.ProductItemImage src={imageUrl} />
        </Styled.ImageContainer>
      </Styled.ImageOverflowContainer>
      <Styled.ProductItemInfo>
        <Styled.ProductItemInfoUpperBoundary>
          <Styled.ProductItemTitle>{name}</Styled.ProductItemTitle>
          <ProductQuantityController productID={id} />
        </Styled.ProductItemInfoUpperBoundary>
        <Styled.ProductItemPrice>{price.toLocaleString()}원</Styled.ProductItemPrice>
      </Styled.ProductItemInfo>
    </Styled.ProductItemWrapper>
  );
};

export default ProductItem;
