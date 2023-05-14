import styled from 'styled-components';

export const Button = styled.button<{
  $width?: string;
  $height?: string;
  backgroundColor?: string;
  borderColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width || '132px'};
  height: ${({ $height }) => $height || '32px'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#333333'};
  border: 1px solid ${({ borderColor }) => borderColor || 'none'};
`;
