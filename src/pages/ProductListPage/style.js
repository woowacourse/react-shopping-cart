import styled from 'styled-components';

import { Template } from '../../components';
import { BREAKPOINTS, COLOR, PATTERN_FILE_NAME } from '../../constants';

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
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

/* Item */

export const Container = styled.li`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: 1rem;
  margin: 0.2rem 0;
`;

export const Price = styled.span`
  font-size: 1.25rem;
  margin: 0.2rem 0;
`;

export const Image = styled.img.attrs((props) => ({
  alt: props.src.match(PATTERN_FILE_NAME)[0],
}))`
  width: 4.5rem;
  height: 6rem;
  background-image: url(${(props) => props.src});
  background-size: cover;

  @media (min-width: ${BREAKPOINTS.MOBILE}) {
    width: 4.5rem;
    height: 6rem;
  }

  @media (min-width: ${BREAKPOINTS.TABLET}) {
    width: 6rem;
    height: 8rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_S}) {
    width: 7.5rem;
    height: 10rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_M}) {
    width: 9rem;
    height: 12rem;
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    width: 10.5rem;
    height: 14rem;
  }
`;
