import styled from "@emotion/styled";

export const ListItem = styled.li<{ direction: "row" | "column"; gap: number; disabled?: boolean }>`
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  padding: 12px 0 24px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const Information = styled.div<{ direction: "row" | "column"; gap: number; disabled?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  ${(props) => (props.direction === "row" ? "align-items: center" : "align-items: base-line")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
