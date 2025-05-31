import styled from "@emotion/styled";

export const Spacing = styled.div<{ size: number }>`
  height: ${({ size }) => size}px;
`;
