import { useDispatch } from 'react-redux';
import { getAction } from '../../../redux';
import * as Styled from './style.js';
import { ProductItem } from './ProductItem';
import products from '../../../mockData/product.json';

export const ProductListPage = () => {
  const dispatch = useDispatch();
  const dispatchAddProduct = (product) => dispatch(getAction.addProduct(product));

  return (
    <Styled.Page>
      <Styled.ProductList>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addProduct={dispatchAddProduct} />
        ))}
      </Styled.ProductList>
    </Styled.Page>
  );
};
