import styled from 'styled-components';

export const StyledCartList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: auto;

  & > *:not(:last-child) {
    border-bottom: 1px solid #cccccc;
  }
`;

export const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 40px 40px 40px;
`;
