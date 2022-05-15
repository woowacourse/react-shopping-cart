import React, { useEffect } from 'react';
import { useProducts } from 'hooks';

import { ProductListStyled, LoadingWrapperStyled } from './style';

import Product from 'templates/Product';
import Text from 'components/Text';

function ProductList() {
  const { isProductLoading, products, requestProduct } = useProducts();

  useEffect(() => {
    requestProduct();
  }, []);

  if (isProductLoading) {
    return (
      <LoadingWrapperStyled>
        <Text color="#333333" fontSize="30px" fontWeight="800">
          로딩중...
        </Text>
      </LoadingWrapperStyled>
    );
  }

  return (
    <ProductListStyled>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </ProductListStyled>
  );
}

export default ProductList;
