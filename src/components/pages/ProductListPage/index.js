import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux';
import * as Styled from './style.js';
import { ProductItem } from './ProductItem';
import products from '../../../mockData/product.json';

export const ProductListPage = () => {
  const dispatch = useDispatch();

  return (
    <Styled.Page>
      <Styled.ProductList>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddProduct={(product) => dispatch(addProduct(product))}
          />
        ))}
      </Styled.ProductList>
    </Styled.Page>
  );
};
