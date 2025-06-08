import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column;
  padding: 36px 24px 0;
  gap: 32px;
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
`;

export const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;
