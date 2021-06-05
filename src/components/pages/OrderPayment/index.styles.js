import styled from 'styled-components';
import { Page } from '../../@common/PageWrapper/index.styles';

export const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;

  @media (max-width: 960px) {
    display: block;
  }

  & > div:first-child {
    flex-basis: 66.5%;
    padding-right: 4rem;

    @media (max-width: 960px) {
      padding: 0;
    }
  }

  & > div:last-child {
    flex-basis: 33.5%;
    margin-top: 3rem;
    min-width: 16rem;

    @media (max-width: 960px) {
      max-width: 100%;
      border: 0;
    }
  }
`;

export const OrderList = styled.div`
  & > div:first-child {
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }
`;
