import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../redux';
import * as S from './style.js';
import { ProductItem } from './ProductItem';
import { request } from '../../request';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await request.get.productList();
      setProducts(response);
    })();
  }, []);

  return (
    <S.Page>
      <S.ProductList>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addProduct={(product) => dispatch(cartAction.addProduct(product))}
          />
        ))}
      </S.ProductList>
    </S.Page>
  );
};
