import { styled } from 'styled-components';

import { useQuery } from '../hooks/useQuery';

import { Skeleton } from './common/Skeleton';
import { Product } from './Product';

import { ProductType as IProduct } from '../types';

import { BASE_FETCH_URL, SKELETON_LENGTH } from '../constants';

export const ProductList = () => {
  const {
    data: products,
    loading,
    error,
    // } = useQuery<IProduct[]>(BASE_FETCH_URL.PRODUCTS + '?error_code=400');
  } = useQuery<IProduct[]>(BASE_FETCH_URL.PRODUCTS);

  return (
    <Style.Container>
      {loading
        ? Array.from({ length: SKELETON_LENGTH }).map((_, i) => <Skeleton key={i} />)
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
