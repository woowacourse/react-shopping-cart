import { useState, useEffect } from 'react';
import * as S from './style.js';
import { ProductItem } from './ProductItem';
import { useCartDispatch, useRequest } from '../../hooks';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { addProduct } = useCartDispatch();
  const { getProductList } = useRequest();

  useEffect(() => {
    (async () => {
      const response = await getProductList();

      setProducts(response);
    })();
  }, [getProductList]);

  return (
    <S.Page>
      <S.ProductList>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addProduct={addProduct} />
        ))}
      </S.ProductList>
    </S.Page>
  );
};
