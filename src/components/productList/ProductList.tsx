import type { ProductType } from '../../types';

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import * as api from '../../api';
import Product from './Product';
import { cartState } from '../../recoil/state';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    api.getProducts().then(setProducts);
    api.getCart().then(setCart);
  }, []);

  if (products === null) return <>로딩중!</>;
  return (
    <Wrapper>
      {products.map((product) => (
        <Product key={product.id} {...product}></Product>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 282px);
  }
`;
