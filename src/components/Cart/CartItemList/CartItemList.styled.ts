import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 340px;
  overflow-y: scroll;
  & li:last-of-type {
    border-bottom: 1px solid #0000001a;
  }
`;
