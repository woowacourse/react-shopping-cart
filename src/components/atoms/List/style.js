import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;

  & > li {
    margin: 0;
    width: 100%;
    min-height: 3.5rem;
  }
`;
