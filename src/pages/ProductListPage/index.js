import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadData, PRODUCT_LIST } from '../../firebase';
import { cartAction } from '../../redux';
import * as S from './style.js';
import { ProductItem } from './ProductItem';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadData({ table: PRODUCT_LIST, handler: setProducts });
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
