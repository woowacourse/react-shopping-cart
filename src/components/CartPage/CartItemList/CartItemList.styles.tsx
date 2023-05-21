import styled from 'styled-components';

export const Root = styled.ul`
  width: 100%;

  padding: 2rem 0;

  & > li {
    padding: 2rem 0;
  }

  & > li:not(:last-child) {
    border-bottom: 1.5px solid #cccccc;
  }
`;
