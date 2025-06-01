import styled from '@emotion/styled';

export const Container = styled.button<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ selected }) => (selected ? 'black' : 'white')};
  border: 1px solid ${({ selected }) => (selected ? 'black' : '#0000002a')};

  border-radius: 8px;
`;
