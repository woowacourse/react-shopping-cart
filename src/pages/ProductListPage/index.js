import { useState, useEffect } from 'react';
import * as S from './style.js';
import { ProductItem } from './ProductItem';
import { useCartDispatch, useRequest } from '../../hooks';
import { useHistory } from 'react-router';
import { ROUTE } from '../../constants/route.js';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { addProduct } = useCartDispatch();
  const { getProductList } = useRequest();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getProductList();

      setProducts(response);
    })();
  }, [getProductList]);

  const goToDetail = (id) => {
    history.push(`${ROUTE.PRODUCT_DETAIL}/${id}`);
  };

  return (
    <S.Page>
      <S.ProductList>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addProduct={addProduct}
            goToDetail={goToDetail}
          />
        ))}
      </S.ProductList>
    </S.Page>
  );
};
