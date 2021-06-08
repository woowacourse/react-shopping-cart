import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../redux';
import { loadData, PRODUCT_LIST } from '../../firebase';
import { Item } from './Item';
import * as S from './style';

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
          <Item
            key={product.id}
            product={product}
            addProduct={(product) => dispatch(cartAction.addProduct(product))}
          />
        ))}
      </S.ProductList>
    </S.Page>
  );
};
