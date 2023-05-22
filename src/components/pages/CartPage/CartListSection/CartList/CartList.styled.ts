import styled from 'styled-components';

export const StyledCartList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > *:not(:last-child) {
    border-bottom: 1px solid #cccccc;
  }
`;
