import styled from 'styled-components';

export const Root = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 15rem;

  padding: 2rem 0;

  & > li {
    padding: 2rem 0;
  }

  & > li:not(:last-child) {
    border-bottom: 1.5px solid #cccccc;
  }
`;

export const EmptyMessage = styled.li`
  font-size: 2rem;
  text-align: center;
`;
