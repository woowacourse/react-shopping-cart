import { ProductType } from '@/domain/product';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';
interface ProductListType {
  productList: ProductType[];
}

function ProductList({ productList }: ProductListType) {
  return (
    <Styled.Container>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
}

ProductList.skeleton = () => {
  return (
    <Styled.Container>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCard.skeleton key={index} />
      ))}
    </Styled.Container>
  );
};

export default ProductList;
