import styled from 'styled-components';

export const Page = styled.div`
  padding: 7rem 15rem;
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1rem;

  & > div:first-child {
    flex-basis: 70%;
    padding-right: 4rem;
  }

  & > div:last-child {
    flex-basis: 30%;
    margin-top: 3rem;
  }
`;

export const OrderList = styled.div`
  & > div:first-child {
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }
`;
