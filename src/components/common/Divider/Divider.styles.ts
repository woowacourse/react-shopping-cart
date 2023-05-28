import styled from 'styled-components';

export interface TextProps {
  thickness?: number;
}

const Divider = styled.div<TextProps>`
  border-bottom: ${({ thickness = 1 }) => thickness}px solid ${({ theme }) => theme.color.gray2};
`;

export { Divider };
