import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types';
import * as S from './ProductCardGrid.styled';

type Props = {
  productList: Array<Product>;
};

function ProductCardGrid({ productList }: Props) {
  return (
    <S.ProductCardGridBox>
      {productList.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </S.ProductCardGridBox>
  );
}

export default ProductCardGrid;
