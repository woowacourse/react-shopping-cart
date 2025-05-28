import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px 24px 0;
`;

export const CartList = styled.div`
  overflow: scroll;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;
`;
