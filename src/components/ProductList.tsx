import { useEffect } from 'react';
import { styled } from 'styled-components';
import Product from './Product';

import { Product as IProduct } from '../types';
import { useQuery } from '../hooks/useQuery';

export default function ProductList() {
  const { isLoading, data: products, fetchData } = useQuery<IProduct[]>();

  useEffect(() => {
    fetchData('/products');
  });

  return (
    <Style.Container>
      {products?.map((product) => {
        return (
          <li key={product.id}>
            <Product item={product} />
          </li>
        );
      })}
    </Style.Container>
  );
}

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 45px;
    grid-row-gap: 60px;
  `,
};
