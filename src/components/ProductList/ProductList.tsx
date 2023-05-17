import { Suspense } from 'react';

import ProductItem from '../ProductItem/ProductItem';
import { Column, Row } from '../../styles/style';
import { useReadOnlyProductList } from '../../hooks/productListState/productListState';

function ProductList() {
  const productList = useReadOnlyProductList();

  return (
    <Suspense fallback={<h2>로딩중입니다...</h2>}>
      <Row>
        {productList.map((product) => (
          <Column key={product.id}>
            <ProductItem product={product} />
          </Column>
        ))}
      </Row>
    </Suspense>
  );
}

export default ProductList;
