import ProductItem from '@Components/ProductItem/index';
import { useEffect, useState } from 'react';

import { getFetchProductList } from '@Api/index';

import { Product } from '@Types/index';

import * as S from './style';

function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    getFetchProductList<Product[]>().then((res) => {
      setProductList(res);
    });
  }, []);

  return (
    <S.ProductListContainer>
      {productList.map((data: Product) => (
        <ProductItem product={data} key={data.id} />
      ))}
    </S.ProductListContainer>
  );
}

export default ProductList;
