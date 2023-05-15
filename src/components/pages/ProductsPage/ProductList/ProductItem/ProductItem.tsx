import { Product } from '@customTypes/Product';

import {
  StyledProductFlexBox,
  StyledProductItem,
} from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem.styled';
import SquareImage from '@commons/SquareImage/SquareImage';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import Text from '@components/commons/Text/Text';

interface ProductItemProps {
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  return (
    <StyledProductItem>
      <SquareImage src={imageUrl} alt={name} size="xl" />
      <StyledProductFlexBox>
        <div>
          <Text text={name} fontSize="16px" lineHeight="24px" />
          <Text
            text={price.toLocaleString('ko-KR') + ' 원'}
            fontSize="20px"
            lineHeight="27px"
          />
        </div>
        <ProductStepper productId={id} />
      </StyledProductFlexBox>
    </StyledProductItem>
  );
};

export default ProductItem;
