import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1080px;
  margin: 0 auto;
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

export const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    width: 20%;
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 0.6rem;
  }
`;

export const ShoppingList = styled.div`
  & > div:first-child {
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }
`;
