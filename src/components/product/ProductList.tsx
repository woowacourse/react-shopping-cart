import { styled } from 'styled-components';
import { PRODUCTS_BASE_URL } from '../../constants';
import { ProductInfo } from '../../types';
import { fetchApi } from '../../api';
import { createPromise } from '../../utils/suspense';
import Product from './Product';

const ProductListPromise = createPromise<ProductInfo[]>(fetchApi(PRODUCTS_BASE_URL));

export default function ProductList() {
  const productList = ProductListPromise.read();

  return (
    <Style.Container>
      {productList.map((product) => (
        <li key={product.id}>
          <Product productInfo={product} />
        </li>
      ))}
    </Style.Container>
  );
}

const Style = {
  Container: styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 45px;
    grid-row-gap: 60px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(3, 1fr);
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
};
