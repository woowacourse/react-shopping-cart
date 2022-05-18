import styled from 'styled-components';

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.mainColor};
`;

export const CounterButton = styled.button`
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  border: none;

  &:hover {
    opacity: 0.5;
  }
`;

export const Count = styled.p`
  padding: 10px;
`;
