import styled from "@emotion/styled";

export const Price = styled.div<{ direction: "row" | "column"; gap: number }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
`;

export const Wrap = styled.div<{ direction: "row" | "column"; gap: number }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  padding: 12px 0;
  border-top: 1px solid #0000001a;
`;

export const WithLabel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
