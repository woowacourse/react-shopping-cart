import styled from 'styled-components';

export const Page = styled.div`
  padding: 7rem;
  min-width: 55rem;
  max-width: 65rem;
  margin: 0 auto;
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;

  & > div:first-child {
    flex-basis: 66.5%;
    padding-right: 4rem;
  }

  & > div:last-child {
    flex-basis: 33.5%;
    margin-top: 3rem;
    min-width: 16rem;
  }
`;

export const OrderList = styled.div`
  & > div:first-child {
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }
`;
