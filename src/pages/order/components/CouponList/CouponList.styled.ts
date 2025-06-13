import styled from "@emotion/styled";

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  & li:last-of-type {
    border-bottom: 1px solid #0000001a;
  }
`;
