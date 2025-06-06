import styled from "@emotion/styled";

export const ListItem = styled.li<{ direction: "row" | "column"; gap: number }>`
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  padding: 12px 0 24px;
`;

export const Information = styled.div<{ direction: "row" | "column"; gap: number }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  ${(props) => (props.direction === "row" ? "align-items: center" : "align-items: base-line")};
`;
