import styled from "@emotion/styled";

export const Container = styled.header`
  background-color: #000000;
  min-width: 430px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 100;

  a {
    text-decoration: none;
  }
`;
