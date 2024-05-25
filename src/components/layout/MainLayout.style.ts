import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #888;
`;

export const LayoutWrapper = styled.div`
  width: 430px;
  height: calc(100vh - 64px);
  min-height: 100%;
  margin-top: 64px;
  position: relative;

  overflow-y: scroll;

  background-color: white;
  color: black;
`;

export const Title = styled.span`
  ${({ theme }) => theme.TEXT.xLarge};
`;

export const Header = styled.header`
  width: 100%;
  height: 64px;
  max-width: 430px;
  position: fixed;
  top: 0;

  padding: 24px;
  display: flex;
  align-items: center;

  background-color: #000000;
  color: #ffffff;

  box-sizing: border-box;
`;
