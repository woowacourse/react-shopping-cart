import styled from '@emotion/styled';

export const Container = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #bebebe;
  }
`;
