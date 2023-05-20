import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Product } from './Product';
import { useQuery } from '../hooks/useQuery';

import { Product as IProduct } from '../types';
import { Skeleton } from './Skeleton';

export const ProductList = () => {
  const { isLoading, data: products, fetchData } = useQuery<IProduct[]>();

  useEffect(() => {
    fetchData('/products');
  }, []);

  return (
    <Style.Container>
      {isLoading
        ? Array.from({ length: 12 }).map(() => <Skeleton />)
        : products?.map((product) => (
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

    margin-top: 60px;
  `,
};
