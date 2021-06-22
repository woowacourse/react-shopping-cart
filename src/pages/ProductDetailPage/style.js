import styled from 'styled-components';

import { Button, Template } from '../../components';
import { BREAKPOINTS, COLOR } from '../../constants';

export const Page = styled(Template)`
  background-color: ${COLOR.HEX.WHITE};
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem;
  width: 12rem;

  @media (min-width: ${BREAKPOINTS.MOBILE}) {
    width: 12rem;
  }

  @media (min-width: ${BREAKPOINTS.TABLET}) {
    width: 16rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_S}) {
    width: 18rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_M}) {
    width: 24rem;
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    width: 28rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 12rem;

  background-image: url(${(props) => props.src});
  background-size: cover;

  @media (min-width: ${BREAKPOINTS.MOBILE}) {
    height: 12rem;
  }

  @media (min-width: ${BREAKPOINTS.TABLET}) {
    height: 16rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_S}) {
    height: 18rem;
  }

  @media (min-width: ${BREAKPOINTS.LAPTOP_M}) {
    height: 24rem;
  }

  @media (min-width: ${BREAKPOINTS.DESKTOP}) {
    height: 28rem;
  }
`;

export const Name = styled.span`
  align-self: flex-start;
  margin: 2rem 0 1rem;

  color: ${COLOR.HEX.GRAY_700};
  font-size: 1.75rem;
  font-weight: 800;
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  width: 100%;

  font-size: 1.5rem;
  letter-spacing: -0.05rem;
`;

export const AddButton = styled(Button)`
  width: 100%;
  height: 4.5rem;

  font-size: 1.5rem;
  background-color: ${COLOR.HEX.BROWN};
  color: ${COLOR.HEX.WHITE};
`;
