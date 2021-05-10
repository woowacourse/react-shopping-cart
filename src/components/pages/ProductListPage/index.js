import * as Styled from './style.js';
import { ProductItem } from './ProductItem';
import products from '../../../mockData/product.json';

export const ProductListPage = () => {
  return (
    <Styled.Page>
      <Styled.ProductList>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Styled.ProductList>
    </Styled.Page>
  );
};
