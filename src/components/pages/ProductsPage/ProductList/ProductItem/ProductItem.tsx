import { Product } from '@customTypes/Product';

import {
  StyledProductFlexBox,
  StyledProductItem,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem.styled';
import SquareImage from '@commons/SquareImage/SquareImage';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import * as Text from '@components/commons/Text/Text';

interface ProductItemProps {
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  return (
    <StyledProductItem>
      <SquareImage src={imageUrl} alt={name} size="xl" />
      <div>
        <StyledProductFlexBox>
          <Text.Description>{name}</Text.Description>
          <ProductStepper productId={id} />
        </StyledProductFlexBox>
        <Text.Paragraph>{price.toLocaleString('ko-KR') + ' 원'}</Text.Paragraph>
      </div>
    </StyledProductItem>
  );
};

export default ProductItem;
