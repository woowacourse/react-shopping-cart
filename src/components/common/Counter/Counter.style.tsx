import styled from 'styled-components';

export const CounterContainer = styled.div`
  min-width: 100px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.brandColor_1};
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

export const InputCount = styled.input`
  width: 40px;
  padding: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
