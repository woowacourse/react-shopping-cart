import * as Styled from './style.js';
import { ProductItem } from '../../commons';
import product from '../../../mockData/product.json';

export const ProductListPage = () => {
  return (
    <Styled.Page>
      <Styled.ProductList>
        {product.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </Styled.ProductList>
    </Styled.Page>
  );
};
