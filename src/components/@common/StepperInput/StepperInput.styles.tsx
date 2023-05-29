import styled from 'styled-components';

export const StepperInputWrapper = styled.div`
  display: flex;
`;

export const Input = styled.input<{ $width: number }>`
  border: 1px solid #ddd;
  width: ${({ $width }) => `${$width * 0.63}px`};
  height: ${({ $width }) => `${$width * 0.43}px`};
  text-align: center;
`;

export const StepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Stepper = styled.button<{ $width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  border: 1px solid #ddd;
  width: ${({ $width }) => `${$width - $width * 0.63}px`};
  height: ${({ $width }) => `${($width * 0.43) / 2}px`};
  cursor: pointer;
`;

export const StepperImg = styled.img<{ $width: number }>`
  width: ${({ $width }) => `${$width / 13}px`};
`;
