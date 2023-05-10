import styled from 'styled-components';

export const StepperInputContainer = styled.input<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
