import styled from 'styled-components';
import { Template } from '../../components';
import { BREAKPOINTS, COLOR } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.HEX.WHITE};
`;

export const Main = styled.main;

export const ProductList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 0;

  @media (min-width: ${BREAKPOINTS.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${BREAKPOINTS.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_S}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_M}) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
