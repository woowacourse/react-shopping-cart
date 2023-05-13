import { Product } from '../../types/Product';

import {
  StyledNameParagraph,
  StyledPriceParagraph,
  StyledProductDetailDiv,
  StyledProductItem,
} from './ProductItem.styled';
import SquareImage from '../commons/SquareImage/SquareImage';
import ProductStepper from '../ProductStepper/ProductStepper';

interface ProductItemProps {
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  return (
    <StyledProductItem>
      <SquareImage src={imageUrl} alt={name} size="xl" />
      <StyledProductDetailDiv>
        <div>
          <StyledNameParagraph>{name}</StyledNameParagraph>
          <StyledPriceParagraph>
            {price.toLocaleString('ko-KR')} 원
          </StyledPriceParagraph>
        </div>
        <ProductStepper productId={id} />
      </StyledProductDetailDiv>
    </StyledProductItem>
  );
};

export default ProductItem;
