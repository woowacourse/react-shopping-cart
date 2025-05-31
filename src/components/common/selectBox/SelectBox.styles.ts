import styled from '@emotion/styled';

export const Container = styled.button<{ isSelected: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};
  border: 1px solid ${({ isSelected }) => (isSelected ? 'black' : '#0000002a')};

  border-radius: 8px;
`;
