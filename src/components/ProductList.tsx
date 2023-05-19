import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Product } from './Product';
import { useQuery } from '../hooks/useQuery';

import { Product as IProduct } from '../types';

export const ProductList = () => {
  const { isLoading, data: products, fetchData } = useQuery<IProduct[]>();

  useEffect(() => {
    fetchData('/products');
  }, []);

  // TODO Skeleton
  return (
    <Style.Container>
      {products?.map((product) => (
        <li key={product.id}>
          <Product item={product} />
        </li>
      ))}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 45px;
    grid-row-gap: 60px;
  `,
};
