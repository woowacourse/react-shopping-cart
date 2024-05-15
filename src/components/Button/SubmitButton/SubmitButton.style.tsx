import styled from 'styled-components';

export const ButtonWrapper = styled.button<{ $isActive: boolean }>`
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 64px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  background-color: ${(props) => (props.$isActive ? 'black' : 'lightgrey')};
`;
