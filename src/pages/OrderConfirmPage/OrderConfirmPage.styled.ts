import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100% - 150px);
  display: flex;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextWrap = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? `${props.gap}px` : "2px")};
  & * {
    text-align: center;
  }
`;

export const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;
