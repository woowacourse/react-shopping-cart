import styled from "styled-components";

export const Wrapper = styled.dialog`
  border-radius: 5px;
  border: 0;
  &::backdrop {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const DiaglogContent = styled.div`
  width: 300px;
  min-height: 300px;
`;
