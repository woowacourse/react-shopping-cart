import styled from "@emotion/styled";

export const Wrap = styled.div<{ direction?: "row" | "column"; gap: number }>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "row"};
  gap: ${(props) => `${props.gap}px`};
`;
