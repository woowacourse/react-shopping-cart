import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const Container = styled.div`
  width: 1080px;

  margin-top: 80px;

  @media screen and (max-width: 1080px) {
    width: 100%;

    padding: 0 16px;
  }
`;
