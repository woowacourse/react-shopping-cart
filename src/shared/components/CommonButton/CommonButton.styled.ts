import styled from '@emotion/styled';

export const Container = styled.button<{ colorType: 'white' | 'black' }>`
  width: 100%;
  height: 48px;
  background-color: ${({ colorType }) => (colorType === 'white' ? '#fff' : '#333')};
  border-radius: 5px;
  border: ${({ colorType }) =>
    colorType === 'white' ? '1px solid rgba(51, 51, 51, 0.25)' : 'none'};
  color: ${({ colorType }) => (colorType === 'white' ? '#666' : '#fff')};
  text-align: center;
  font-size: 15px;
  font-weight: 700;
`;
