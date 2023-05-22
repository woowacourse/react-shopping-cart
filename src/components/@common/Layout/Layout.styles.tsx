import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1600px;
  padding-bottom: 80px;

  @media screen and (max-width: 1750px) {
    padding: 0 80px;
  }
`;
