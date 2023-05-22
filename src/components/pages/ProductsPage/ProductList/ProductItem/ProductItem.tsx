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
  initUrl: string;
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { initQuantity, initUrl, product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  return (
    <StyledProductItem>
      <ProductImage src={imageUrl} alt={name} size="xl" />
      <div>
        <StyledProductFlexBox>
          <Text.Description>{name}</Text.Description>
          <ProductStepper
            productId={id}
            initQuantity={initQuantity}
            initUrl={initUrl}
          />
        </StyledProductFlexBox>
        <Text.Paragraph>{price.toLocaleString('ko-KR') + ' 원'}</Text.Paragraph>
      </div>
    </StyledProductItem>
  );
};

export default ProductItem;
