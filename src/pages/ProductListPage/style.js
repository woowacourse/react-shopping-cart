import styled from 'styled-components';
import { Template } from '../../components';

export const Page = styled(Template)`
  background-color: #ffffff;
`;

export const Main = styled.main;

export const ProductList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 0;

  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
