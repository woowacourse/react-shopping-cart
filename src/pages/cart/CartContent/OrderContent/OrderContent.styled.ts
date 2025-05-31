import styled from "@emotion/styled";

export const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 64px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;
