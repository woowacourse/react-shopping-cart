import { Product } from '@customTypes/Product';

import {
  StyledProductFlexBox,
  StyledProductItem,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem.styled';
import { SquareImage as ProductImage } from '@commons/SquareImage/SquareImage';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import * as Text from '@components/commons/Text/Text';

interface ProductItemProps {
  initQuantity: number;
  initCartItemId: string | null;
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { initQuantity, initCartItemId, product } = props;
  const { name, imageUrl, price } = product;

  return (
    <StyledProductItem>
      <ProductImage src={imageUrl} alt={name} size="xl" />
      <div>
        <StyledProductFlexBox>
          <Text.Description>{name}</Text.Description>
          <ProductStepper
            product={product}
            initQuantity={initQuantity}
            initCartItemId={initCartItemId}
          />
        </StyledProductFlexBox>
        <Text.Paragraph>{price.toLocaleString('ko-KR') + ' 원'}</Text.Paragraph>
      </div>
    </StyledProductItem>
  );
};

export default ProductItem;
