import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadData, PRODUCT_LIST_COLLECTION } from '../../../firebase';
import { getAction } from '../../../redux';
import * as Styled from './style.js';
import { ProductItem } from './ProductItem';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const dispatchAddProduct = (product) => dispatch(getAction.addProduct(product));

  useEffect(() => {
    loadData(setProducts, PRODUCT_LIST_COLLECTION);
  }, []);

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
