import { styled } from 'styled-components';

import { useQuery } from '../hooks/useQuery';

import { Skeleton } from './common/Skeleton';
import { Product } from './Product';

import { Product as IProduct } from '../types';

export const ProductList = () => {
  const { data: products, loading, error } = useQuery<IProduct[]>('/products');

  return (
    <Style.Container>
      {loading
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
    margin-top: 60px;

    @media screen and (min-width: 501px) {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 45px;
      grid-row-gap: 60px;
    }

    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-bottom: 40px;

      & > li:not(:last-child) {
        margin-bottom: 45px;
      }
    }
  `,
};
