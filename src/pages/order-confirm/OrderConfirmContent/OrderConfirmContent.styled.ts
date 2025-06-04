import styled from "@emotion/styled";

export const Container = styled.main`
  padding: 36px 24px 12px;
  height: calc(100vh - 128px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;
