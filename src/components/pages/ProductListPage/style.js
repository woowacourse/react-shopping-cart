import styled from 'styled-components';
import { Template } from '../../commons';

export const Page = styled(Template)`
  background-color: #ffffff;
`;

export const Main = styled.main``;

export const ProductList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
`;
