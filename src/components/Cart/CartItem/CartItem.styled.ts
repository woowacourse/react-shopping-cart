import styled from "@emotion/styled";

export const ListItem = styled.li<{ direction: "row" | "column"; gap: number }>`
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
  padding: 12px 0 20px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div<{
  direction: "row" | "column";
  gap: number;
  verticalPosition: "start" | "center" | "end";
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};

  ${(props) =>
    props.direction === "row" ? `align-items:${props.verticalPosition}` : `justify-content:${props.verticalPosition}`};
`;

export const Image = styled.div`
  width: 112px;
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

export const Information = styled.div<{ direction: "row" | "column"; gap: number }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => `${props.gap}px`};
`;
