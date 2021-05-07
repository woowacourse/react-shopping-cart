import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  border-top: 0.0625rem solid #aaaaaa;

  & > li {
    margin: 0;
    width: 100%;
    min-height: 3.5rem;
    border-top: 0.0625rem solid #aaaaaa;
  }

  & > li:last-child {
    border-bottom: 0.0625rem solid #aaaaaa;
  }
`;
