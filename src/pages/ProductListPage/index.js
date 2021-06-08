import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END_POINT, PATH } from '../../constants';

import { cartAction } from '../../redux';
import { Item } from './Item';
import * as S from './style';
import { requestGet, deepCamelize } from '../../utils';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await requestGet({ url: `${END_POINT}${PATH.PRODUCT_LIST}` });

        if (response.status !== 200) {
          throw new Error(response);
        }
        const body = await response.json();

        setProducts(deepCamelize(body));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <S.Page>
      <S.ProductList>
        {products?.map((product) => (
          <Item
            key={product.productId}
            product={product}
            addProduct={(product) => dispatch(cartAction.addProduct(product))}
          />
        ))}
      </S.ProductList>
    </S.Page>
  );
};
