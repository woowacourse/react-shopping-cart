import { styled } from 'styled-components';
import mockData from '../assets/mock.json';
import Product from './Product';

export default function ProductList() {
  return (
    <Style.Container>
      {mockData.map((product) => (
        <li key={product.id}>
          <Product info={product} />
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
